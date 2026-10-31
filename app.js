let members = [
    {
        memberCode: "GYM-001", fullName: "Hoàng Văn Nam",
        packageName: "Gói Cơ Bản",
        age: 22, monthCount: 3
    },
    {
        memberCode: "GYM-002", fullName: "Lý Thị Mai",
        packageName: "Gói Yoga",
        age: 30, monthCount: 6
    },
    {
        memberCode: "GYM-003", fullName: "Bùi Đức Anh",
        packageName: "Gói Thể Hình Nâng Cao",
        age: 27, monthCount: 12
    }
];

function validateMemberCode(code) {
    if (code === "") {
        return "Lỗi: Mã không được để trống";
    }
    if (code.length < 6) {
        return "Lỗi: Độ dài kí tự nhỏ hơn 6";
    }
    if (!code.startsWith("GYM-")) {
        return `Lỗi: Sai tiền tố "GYM-"`;
    }           
    if (/\s/.test(code)) {
        return "Lỗi: Chứa khoảng trắng";
    }
    if (findMemberIndex(code) !== -1) {
        return "Lỗi: Mã đã tồn tại";
    }
    return "";
}

function findMemberIndex(code) {
    return members.findIndex(function (member) {
        return member.memberCode === code;
    });
}

function normalizeText(rawText) {
    while (true) {
        const input = prompt(rawText);
        if (input === null) {
            return null;
        }
        const value = input.trim().replace(/\s+/g, " ");
        if (value !== "") {
            return value.split(" ").map(function (word) {
                return word.charAt(0).toLocaleUpperCase("vi-VN")
                    + word.slice(1).toLocaleLowerCase("vi-VN");
            }).join(" ");
        }
        console.log("Thông tin không được để trống!");
    }
}

function inputIntegerInRange(message, min, max) {
    while (true) {
        const input = prompt(message);
        if (input === null) {
            return null;
        }
        const value = input.trim();
        const number = Number(value);
        if (value !== "" && Number.isSafeInteger(number) && number >= min && number <= max) {
            return number;
        }
        console.log(`Vui lòng nhập số nguyên từ ${min} đến ${max}!`);
    }
}

function displayMember(list) {
    if (list.length === 0) {
        console.log("Danh sách trống rỗng");
        return;
    }
    list.forEach(function (member, index) {
        console.log(
            `Đơn số: ${index + 1} | ` +
            `Mã vé:  ${member.memberCode} | ` +
            `khách hàng: ${member.fullName} | ` +
            `Tên gói: ${member.packageName} | ` +
            `tuổi: ${member.age} | ` +
            `tháng: ${member.monthCount} | `
        );
    });
    console.log(`Tổng: ${list.length} hội viên`);
}

function addMember() {
    let memberCode;
    while (true) {
        const input = prompt("Nhập mã hội viên (bắt đầu bằng GYM-): ");
        if (input === null) {
            console.log("Đã hủy thêm hội viên.");
            return;
        }
        memberCode = input.trim();
        const error = validateMemberCode(memberCode);
        if (error === "") {
            break;
        }
        console.log(error);
    }

    const fullName = normalizeText("Nhập họ và tên hội viên: ");
    if (fullName === null) {
        console.log("Đã hủy thêm hội viên.");
        return;
    }

    const packageName = normalizeText("Nhập tên gói tập: ");
    if (packageName === null) {
        console.log("Đã hủy thêm hội viên.");
        return;
    }

    const age = inputIntegerInRange("Nhập tuổi (1-120): ", 1, 120);
    if (age === null) {
        console.log("Đã hủy thêm hội viên.");
        return;
    }

    const monthCount = inputIntegerInRange("Nhập số tháng đăng ký (1-120): ",1,120);
    if (monthCount === null) {
        console.log("Đã hủy thêm hội viên.");
        return;
    }
    members.push({ memberCode, fullName, packageName, age, monthCount });
    console.log("Thêm hội viên thành công!");
}

function updateMember() {
    const input = prompt("Nhập mã hội viên cần cập nhật: ");
    if (input === null) {
        console.log("Đã hủy cập nhật.");
        return;
    }

    const index = findMemberIndex(input.trim());
    if (index === -1) {
        console.log("Không tìm thấy hội viên.");
        return;
    }

    const fullName = normalizeText("Nhập họ và tên mới: ");
    if (fullName === null) {
        console.log("Đã hủy cập nhật.");
        return;
    }

    const packageName = normalizeText("Nhập tên gói tập mới: ");
    if (packageName === null) {
        console.log("Đã hủy cập nhật.");
        return;
    }

    const age = inputIntegerInRange("Nhập tuổi mới (1-120): ", 1, 120);
    if (age === null) {
        console.log("Đã hủy cập nhật.");
        return;
    }

    const monthCount = inputIntegerInRange("Nhập số tháng đăng ký mới (1-120): ", 1 , 120);
    if (monthCount === null) {
        console.log("Đã hủy cập nhật.");
        return;
    }

    members[index].fullName = fullName;
    members[index].packageName = packageName;
    members[index].age = age;
    members[index].monthCount = monthCount;
    console.log("Cập nhật hội viên thành công!");
}

function deleteMember() {
    const input = prompt("Nhập mã hội viên cần xóa: ");
    if (input === null) {
        console.log("Đã hủy xóa hội viên.");
        return;
    }

    const index = findMemberIndex(input.trim());
    if (index === -1) {
        console.log("Không tìm thấy hội viên.");
        return;
    }

    if (confirm(`Bạn có chắc muốn xóa hội viên ${members[index].fullName}?`)) {
        members.splice(index, 1);
        console.log("Xóa hội viên thành công!");
    } else {
        console.log("Đã hủy xóa hội viên.");
    }
}

function searchMemberByPackage() {
    const input = prompt("Nhập tên gói tập mà hội viên sử dụng: ");
    if (input === null || input === "") {
        console.log("Hủy thao tác tìm kiếm!");
        return;
    }
}

function showMenu() {
    let choice;
    do {
        console.log("===========================================");
        console.log("HỆ THỐNG QUẢN LÝ HỘI VIÊN PHÒNG TẬP FITZONE");
        console.log("===========================================");
        console.log("1. Hiển thị danh sách hội viên");
        console.log("2. Thêm hội viên mới");
        console.log("3. Cập nhật thông tin hội viên");
        console.log("4. Xóa hội viên");
        console.log("5. Tìm kiếm hội viên theo gói tập");
        console.log("0. Thoát chương trình");
        const input = prompt("Vui lòng nhập lựa chọn của bạn(0-5): ");
        if (input === null) {
            console.log("Chương trình đã kết thúc.");
            return;
        }

        const value = input.trim();
        if (!/^[0-5]$/.test(value)) {
            console.log("Lựa chọn không hợp lệ!");
            continue;
        }

        choice = Number(value);
        switch (choice) {
            case 1:
                displayMember(members);
                break;
            case 2:
                addMember();
                break;
            case 3:
                updateMember();
                break;
            case 4:
                deleteMember();
                break;
            case 5:
                searchMemberByPackage();
                break;
            case 0:
                console.log("Cảm ơn bạn đã sử dụng chương trình");
                break;
        }
    } while (choice !== 0);
}

showMenu();   