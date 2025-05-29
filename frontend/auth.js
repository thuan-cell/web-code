const SUPABASE_URL = 'https://sbujprduupfyohscibck.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWpwcmR1dXBmeW9oc2NpYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA1NDEsImV4cCI6MjA2NDA3NjU0MX0.nC7tUGNg8kUvKXdtNtaKZzpAyoLgMNBbCe4dXXx2VyE';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)


// Hiển thị thông báo
function showAlert(type, message) {
  return Swal.fire({
    icon: type,
    text: message,
    confirmButtonColor: '#4e54c8'
  });
}

// Đăng nhập
async function signIn() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    return showAlert("warning", "Vui lòng nhập đầy đủ email và mật khẩu.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    showAlert("error", error.message);
  } else {
    showAlert("success", "Đăng nhập thành công!").then(() => {
      window.location.href = "dashboard.html"; // chuyển đến dashboard hoặc trang chính
    });
  }
}

// Đăng ký
async function signUp() {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const fullName = document.getElementById("signup-fullname").value.trim();

  if (!email || !password || !fullName) {
    return showAlert("warning", "Vui lòng nhập đầy đủ thông tin.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) {
    showAlert("error", error.message);
  } else {
    showAlert("success", "Tạo tài khoản thành công! Vui lòng kiểm tra email để xác nhận.");
    toggleForm();
  }
}
