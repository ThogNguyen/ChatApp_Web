import * as signalR from "@microsoft/signalr";

class SignalRService {
    async init() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7186/signalRhub") // Có thể cấu hình nếu cần
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.on("ReceiveMessage", (message) => {
            if (this.onReceiveMessageCallback) {
                this.onReceiveMessageCallback(message);  
            }
        });

        // Xử lý sự kiện kết nối bị đóng
        this.connection.onclose(() => {
            console.log("SignalR connection closed. Attempting to reconnect...");
            this.isConnected = false; // Cập nhật trạng thái
            this.startConnection();
        });

        await this.startConnection();
    }

    async startConnection() {
        try {
            await this.connection.start();
            this.isConnected = true; // Kết nối thành công
            console.log("SignalR connection established.");
        } catch (err) {
            console.error("Error while starting SignalR connection: ", err);
            setTimeout(() => this.startConnection(), 5000); // Thử kết nối lại sau 5 giây
        }
    }

    onReceiveMessage(callback) {
        this.onReceiveMessageCallback = callback;
    }

    async sendMessage(message) {
        if (!this.isConnected) {
            console.warn("Cannot send message, SignalR is not connected.");
            return;
        }
        
        try {
            await this.connection.invoke("SendMessage", message);
            console.log("Message sent:", { message });
        } catch (err) {
            console.error("Error while sending message: ", err);
        }
    }

    async stopConnection() {
        if (this.connection) {
            await this.connection.stop();
            this.isConnected = false; // Cập nhật trạng thái
            console.log("SignalR connection stopped.");
        }
    }

    // Phương thức kiểm tra trạng thái kết nối
    isConnected() {
        return this.isConnected;
    }
}

// Xuất đối tượng SignalRService
const signalRService = new SignalRService();
export default signalRService;
