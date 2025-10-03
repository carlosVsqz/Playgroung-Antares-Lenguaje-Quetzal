/*
Basic Server QZ Playground
*/
use axum::{Router, extract::Json, routing::post, response::IntoResponse, http::StatusCode};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::process::{Command, Stdio};
use tower_http::trace::TraceLayer;
use tracing::{info, error};
use tracing_subscriber;

#[derive(Deserialize)]
struct CodeRequest {
    code: String,
}

#[derive(Serialize)]
struct CodeResponse {
    success: bool,
    stdout: String,
    stderr: String,
}

async fn health_check() -> impl IntoResponse {
    info!("🔍 Health check solicitado");
    (StatusCode::OK, "OK")
}

async fn run_code(Json(payload): Json<CodeRequest>) -> Json<CodeResponse> {
    info!("📨 Petición /run recibida");

    let tmp_file = "temp.qz";

    if let Err(e) = std::fs::write(tmp_file, &payload.code) {
        error!("❌ Error escribiendo archivo temporal: {}", e);
        return Json(CodeResponse {
            stdout: "".to_string(),
            stderr: format!("Error interno del servidor: {}", e),
            success: false,
        });
    }

    let output = Command::new("quetzal")
        .arg(tmp_file)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output();

    match output {
        Ok(output) => {
            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            let success = output.status.success();

            info!("✅ Ejecución completada - Éxito: {}", success);

            let _ = std::fs::remove_file(tmp_file);

            Json(CodeResponse {
                stdout,
                stderr,
                success,
            })
        },
        Err(err) => {
            error!("❌ Error ejecutando comando quetzal: {}", err);

            let _ = std::fs::remove_file(tmp_file);

            Json(CodeResponse {
                stdout: "".to_string(),
                stderr: format!("Error ejecutando código: {}", err),
                success: false,
            })
        },
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .init();

    info!("🚀 Iniciando servidor backend QZ Playground...");

    let app = Router::new()
        .route("/run", post(run_code))
        .route("/health", axum::routing::get(health_check))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(|request: &axum::http::Request<_>| {
                    tracing::info_span!(
                        "http_request",
                        method = ?request.method(),
                        uri = ?request.uri(),
                    )
                })
                .on_request(|request: &axum::http::Request<_>, _span: &tracing::Span| {
                    info!("➡️  {} {}", request.method(), request.uri());
                })
                .on_response(|response: &axum::response::Response, latency: std::time::Duration, _span: &tracing::Span| {
                    info!("⬅️  {} en {:?}", response.status(), latency);
                })
        );

    let addr = SocketAddr::from(([0, 0, 0, 0], 3501));
    info!("🎯 Servidor escuchando en {}", addr);

    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}