const SUPABASE_URL = 'https://sbujprduupfyohscibck.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWpwcmR1dXBmeW9oc2NpYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA1NDEsImV4cCI6MjA2NDA3NjU0MX0.nC7tUGNg8kUvKXdtNtaKZzpAyoLgMNBbCe4dXXx2VyE';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)




// Hàm hiển thị thông báo
function showAlert(type, message) {
  Swal.fire({
    icon: type,
    text: message,
    confirmButtonColor: '#4e54c8'
  });
}

// Xử lý đăng nhập
async function signIn() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    showAlert("warning", "Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    showAlert("error", error.message || "Đăng nhập thất bại.");
  } else {
    showAlert("success", "Đăng nhập thành công!").then(() => {
      window.location.href = "index.html"; // 👉 Sửa đường dẫn nếu cần
    });
  }
}

// Xử lý đăng ký
async function signUp() {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!email || !password) {
    showAlert("warning", "Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    showAlert("error", error.message || "Đăng ký thất bại.");
  } else {
    showAlert("success", "Tạo tài khoản thành công! Hãy kiểm tra email để xác nhận.")
      .then(() => {
        toggleForm();
      });
  }
}

// Chuyển đổi form đăng nhập/đăng ký
function toggleForm() {
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');
  login.style.display = login.style.display === 'none' ? 'block' : 'none';
  signup.style.display = signup.style.display === 'none' ? 'block' : 'none';
}
