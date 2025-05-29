const SUPABASE_URL = 'https://sbujprduupfyohscibck.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWpwcmR1dXBmeW9oc2NpYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA1NDEsImV4cCI6MjA2NDA3NjU0MX0.nC7tUGNg8kUvKXdtNtaKZzpAyoLgMNBbCe4dXXx2VyE';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)




/**
 * Hiển thị thông báo đẹp bằng SweetAlert2
 * @param {string} type - 'success' | 'error' | 'warning'
 * @param {string} message - Nội dung thông báo
 */
function showAlert(type, message) {
  Swal.fire({
    icon: type,
    title: message,
    confirmButtonText: 'OK',
    customClass: { popup: 'rounded-xl p-4' }
  });
}

/**
 * Đăng ký tài khoản người dùng mới (gồm Họ tên, Email, Mật khẩu)
 * Sau khi đăng ký sẽ insert thêm vào bảng profiles nếu cần
 */
async function signUp() {
  const fullName = document.getElementById('signup-fullname').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!fullName || !email || !password) {
    showAlert("warning", "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.");
    return;
  }

  // Tạo tài khoản mới
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    showAlert("error", "Lỗi đăng ký: " + error.message);
    return;
  }

  // Nếu có user.id thì insert vào bảng profiles
  const user = data.user;
  if (user) {
    await supabaseClient
      .from('profiles')
      .insert([{ id: user.id, full_name: fullName, email: email }]);
  }

  showAlert("success", "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
  toggleForm();
}

/**
 * Đăng nhập người dùng bằng email và password
 */
async function signIn() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    showAlert("warning", "Vui lòng nhập email và mật khẩu.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showAlert("error", "Lỗi đăng nhập: " + error.message);
  } else {
    showAlert("success", "Đăng nhập thành công!");
    // window.location.href = "dashboard.html"; // nếu cần chuyển trang
  }
}

/**
 * Lấy thông tin người dùng hiện tại (đã đăng nhập)
 */
async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    showAlert("error", "Không thể lấy thông tin người dùng: " + error.message);
  } else if (data.user) {
    document.getElementById('user-info').textContent = JSON.stringify(data.user, null, 2);
  } else {
    showAlert("warning", "Chưa đăng nhập.");
  }
}

/**
 * Đăng xuất người dùng
 */
async function signOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    showAlert("error", "Lỗi đăng xuất: " + error.message);
  } else {
    showAlert("success", "Đã đăng xuất.");
    const info = document.getElementById('user-info');
    if (info) info.textContent = '';
  }
}

/**
 * Chuyển đổi hiển thị form đăng nhập / đăng ký
 */
function toggleForm() {
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');

  login.style.display = login.style.display === 'none' ? 'block' : 'none';
  signup.style.display = signup.style.display === 'none' ? 'block' : 'none';
}
