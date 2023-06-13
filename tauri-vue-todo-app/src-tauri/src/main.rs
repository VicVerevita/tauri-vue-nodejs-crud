use rocket::tokio::task;
use reqwest::Client;
use serde_json::json;
use std::sync::atomic::{AtomicUsize, Ordering};

#[tauri::command]
async fn get_text() -> String {
    let response: Result<String, task::JoinError> = task::spawn(async move {
        let url: &str = "http://localhost:8081";
        let client: Client = Client::new();
        let response: Result<reqwest::Response, reqwest::Error> = client.get(url).send().await;
        match response {
            Ok(res) => match res.text().await {
                Ok(body) =>
                {
                    format!("{}", body);
                    return body;
                },
                Err(_) => return format!("Failed to read response body"),
            },
            Err(_) => return format!("Failed to send request"),
        }
    }).await;
    match response {
        Ok(res) => return res,
        Err(_) => return format!("Failed to get response"),
    }
}

static COUNTER: AtomicUsize = AtomicUsize::new(0);

#[tauri::command]
async fn add_task(task: String) {

    if task == "" {
        return;
    }

    let url: &str = "http://localhost:8081/tasks";
    let client: Client = Client::new();

    let id = COUNTER.fetch_add(1, Ordering::SeqCst);

    let json_data = json!({
        "id": id,
        "task": task
    });

    let response: Result<reqwest::Response, reqwest::Error> = client.post(url)
        .json(&json_data)
        .send()
        .await;
    
    match response {
        Ok(_body) => {
            println!("Success");
        },
        Err(_) => println!("Failed to read response body"),
    }
}

#[rocket::main]
async fn main() -> () {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_text, add_task])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
