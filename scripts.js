
    // Dữ liệu mẫu
    const mockStudents = [
        { id: "HS001", name: "Nguyễn Văn A", score: 85, status: "Tốt", img: "https://via.placeholder.com/150", note: "Tập trung tốt, hoàn thành bài nhanh." },
        { id: "HS002", name: "Trần Thị B", score: 65, status: "Cảnh báo", img: "https://via.placeholder.com/150", note: "Hay mất tập trung, ngủ gật." },
        { id: "HS003", name: "Lê Văn C", score: 92, status: "Xuất sắc", img: "https://via.placeholder.com/150", note: "Tư duy logic tốt, điểm tuyệt đối." },
        { id: "HS004", name: "Phạm D", score: 45, status: "Yếu", img: "https://via.placeholder.com/150", note: "Không chú ý, làm việc riêng." }
    ];

    // --- 1. Render Bảng (Chỉ hiện thông tin cơ bản) ---
    function renderTable(data) {
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";

        data.forEach((student, index) => {
            let badgeClass = "badge-good";
            if(student.score < 50) badgeClass = "badge-bad";
            else if(student.score < 70) badgeClass = "badge-warn";

            const row = document.createElement("tr");
            row.className = "main-row";
            // Khi click vào hàng -> Gọi hàm mở Modal với ID của học sinh đó
            row.onclick = () => openModal(student); 
            
            row.innerHTML = `
                <td><b>${student.id}</b></td>
                <td>${student.name}</td>
                <td>${student.score}/100</td>
                <td><span class="badge ${badgeClass}">${student.status}</span></td>
                <td style="text-align: right;">
                    <button style="background:none; border:none; color:var(--color-teal); cursor:pointer;">
                        <i class="fas fa-external-link-alt"></i> Xem
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // --- 2. Xử lý MODAL (Dialog) ---
    
    function openModal(student) {
        // Đổ dữ liệu vào các thẻ trong Modal
        document.getElementById("m-img").src = student.img;
        document.getElementById("m-name").innerText = student.name;
        document.getElementById("m-id").innerText = "ID: " + student.id;
        document.getElementById("m-score").innerText = student.score + "/100";
        document.getElementById("m-note").innerText = student.note;
        
        // Chỉnh màu badge trong modal
        const statusEl = document.getElementById("m-status");
        statusEl.innerText = student.status;
        statusEl.className = "badge"; // Reset class
        if(student.score < 50) statusEl.classList.add("badge-bad");
        else if(student.score < 70) statusEl.classList.add("badge-warn");
        else statusEl.classList.add("badge-good");

        // Hiện Modal (display: flex để căn giữa)
        document.getElementById("studentModal").style.display = "flex";
    }

    function closeModal() {
        document.getElementById("studentModal").style.display = "none";
    }

    // Đóng khi click ra vùng đen bên ngoài
    function closeModalOnOutside(event) {
        if (event.target.id === "studentModal") {
            closeModal();
        }
    }

    // --- 3. Tìm kiếm ---
    function filterTable() {
        const input = document.getElementById("studentSearch");
        const filter = input.value.toUpperCase();
        const filteredData = mockStudents.filter(s => 
            s.name.toUpperCase().includes(filter) || s.id.toUpperCase().includes(filter)
        );
        renderTable(filteredData);
    }

    // Init
    document.addEventListener('DOMContentLoaded', () => {
        renderTable(mockStudents);
    });


    // --- 3. MÔ PHỎNG BIỂU ĐỒ TUẦN (WEEKLY CHART) ---

// Hàm vẽ biểu đồ từ dữ liệu đầu vào
function renderWeeklyChart(data) {
    const chartContainer = document.getElementById("weeklyChart");
    chartContainer.innerHTML = ""; // Xóa trắng cũ

    const maxHours = 12; // Giả sử tối đa học 12h/ngày để tính % chiều cao

    data.forEach(dayData => {
        // 1. Tính chiều cao %
        let heightPercent = (dayData.hours / maxHours) * 100;
        if(heightPercent > 100) heightPercent = 100;

        // 2. Logic chọn màu
        let colorClass = "bg-pink"; // Mặc định thấp
        if (dayData.hours >= 8) colorClass = "bg-teal";      // Cao
        else if (dayData.hours >= 5) colorClass = "bg-purple"; // Trung bình

        // 3. Tạo HTML cho cột
        const colHtml = `
            <div class="bar-wrapper" style="display:flex; flex-direction:column; align-items:center; gap:5px; flex:1;">
                <div class="bar ${colorClass}" style="height: ${heightPercent}%;" title="${dayData.hours} giờ"></div>
                <span style="font-size:9px; color:#888; font-weight:500;">${dayData.day}</span>
            </div>
        `;
        
        chartContainer.innerHTML += colHtml;
    });
}

// Hàm giả lập dữ liệu ngẫu nhiên (Cho nút bấm Random)
function simulateWeeklyData() {
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const randomData = days.map(day => {
        // Random giờ học từ 2h đến 12h
        const randomHours = Math.floor(Math.random() * 11) + 2; 
        return { day: day, hours: randomHours };
    });

    renderWeeklyChart(randomData);
}

// Gọi mặc định khi vào trang
document.addEventListener('DOMContentLoaded', () => {
    // ... code cũ renderTable ...
    
    // Khởi tạo biểu đồ lần đầu
    simulateWeeklyData();
});