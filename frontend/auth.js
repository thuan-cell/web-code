// auth.js

const supabaseUrl = 'https://ngccjkcvbrzhrghrehlr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nY2Nqa2N2YnJ6aHJnaHJlaGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjM1NDUsImV4cCI6MjA2NDA5OTU0NX0.AozgdihQHsyPsDyh0OX85sGEeIvxa2IxXf0PQPYlte4'; // Thay bằng anon key thật
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
// auth.js


function showAlert(type, message) {
  Swal.fire({ icon: type, text: message, confirmButtonColor: '#4e54c8' });
}

function showLoading(message = 'Đang xử lý...') {
  Swal.fire({ title: message, allowOutsideClick: false, didOpen: () => Swal.showLoading() });
}

function closeAlert() {
  Swal.close();
}

function toggleForm(event) {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('logged-in-state').style.display = 'none';

  if (event.target.id === 'toggle-to-signup') {
    document.getElementById('signup-form').style.display = 'block';
  } else {
    document.getElementById('login-form').style.display = 'block';
  }
}

function showLoggedInState(user) {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('logged-in-state').style.display = 'block';
  document.getElementById('user-email').textContent = user.email;
}

async function insertProfile(user_id, fullname, email) {
  await supabase.from("profiles").insert([{ id: user_id, fullname, email }]);
}

async function signUp() {
  const fullname = document.getElementById("signup-fullname").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!fullname || !email || !password) {
    showAlert("warning", "Vui lòng điền đầy đủ thông tin.");
    return;
  }

  showLoading("Đang đăng ký...");
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    closeAlert();
    showAlert("error", error.message);
  } else {
    const userId = data.user?.id;
    if (userId) await insertProfile(userId, fullname, email);
    closeAlert();
    showAlert("success", "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }
}

async function signIn() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    showAlert("warning", "Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  showLoading("Đang đăng nhập...");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  closeAlert();

  if (error) {
    showAlert("error", error.message);
  } else {
    showAlert("success", "Đăng nhập thành công!");
    showLoggedInState(data.user);
  }
}

async function signOut() {
  showLoading("Đang đăng xuất...");
  await supabase.auth.signOut();
  closeAlert();
  showAlert("success", "Đăng xuất thành công!");
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-signup').addEventListener('click', signUp);
  document.getElementById('btn-signin').addEventListener('click', signIn);
  document.getElementById('btn-signout').addEventListener('click', signOut);
  document.getElementById('toggle-to-signup').addEventListener('click', toggleForm);
  document.getElementById('toggle-to-signin').addEventListener('click', toggleForm);
});
