/*
Basic Server QZ Playground
*/

use axum::{Router, extract::Json, routing::post};
use serde::{Deserialize, Serialize};
use std::process::{Command, Stdio};
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};

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

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/run", post(run_code))
        .layer(CorsLayer::new().allow_origin(Any));

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("🚀 Playground server running at http://127.0.0.1:3000");

    axum::serve(listener, app).await.unwrap();
}

async fn run_code(Json(payload): Json<CodeRequest>) -> Json<CodeResponse> {
    let tmp_file = "temp.qz";
    std::fs::write(tmp_file, &payload.code).unwrap();

    let output = Command::new("quetzal")
        .arg(tmp_file)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output();

    match output {
        Ok(output) => Json(CodeResponse {
            stdout: String::from_utf8_lossy(&output.stdout).to_string(),
            stderr: String::from_utf8_lossy(&output.stderr).to_string(),
            success: output.status.success(),
        }),
        Err(err) => Json(CodeResponse {
            stdout: "".to_string(),
            stderr: err.to_string(),
            success: false,
        }),
    }
}
