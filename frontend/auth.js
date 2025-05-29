// Khai báo thông tin Supabase của bạn
const SUPABASE_URL = 'https://sbujprduupfyohscibck.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWpwcmR1dXBmeW9oc2NpYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA1NDEsImV4cCI6MjA2NDA3NjU0MX0.nC7tUGNg8kUvKXdtNtaKZzpAyoLgMNBbCe4dXXx2VyE';

// Tạo client supabase (đặt tên khác với thư viện)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Hiển thị popup alert với SweetAlert2
function showAlert(type, message) {
  Swal.fire({
    icon: type,
    text: message,
    confirmButtonColor: '#4e54c8'
  });
}

// Chuyển form Đăng nhập <=> Đăng ký
function toggleForm() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}

// Đăng ký
async function signUp() {
  const fullname = document.getElementById("signup-fullname").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!fullname) {
    showAlert("warning", "Vui lòng nhập họ và tên.");
    return;
  }

  if (!email || !password) {
    showAlert("warning", "Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  // Gọi API đăng ký
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullname
      }
    }
  });

  if (error) {
    showAlert("error", error.message);
  } else {
    showAlert("success", "Tạo tài khoản thành công! Vui lòng kiểm tra email để xác nhận.").then(() => {
      toggleForm();
    });
  }
}

// Đăng nhập
async function signIn() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    showAlert("warning", "Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  // Gọi API đăng nhập
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    showAlert("error", error.message);
  } else {
    showAlert("success", "Đăng nhập thành công!").then(() => {
      // Đổi trang sau khi đăng nhập
      window.location.href = "index.html";
    });
  }
}

// Gán sự kiện cho các nút và link
document.getElementById('btn-signup').addEventListener('click', signUp);
document.getElementById('btn-signin').addEventListener('click', signIn);
document.getElementById('toggle-to-signup').addEventListener('click', toggleForm);
document.getElementById('toggle-to-signin').addEventListener('click', toggleForm);
