const SUPABASE_URL = 'https://sbujprduupfyohscibck.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWpwcmR1dXBmeW9oc2NpYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA1NDEsImV4cCI6MjA2NDA3NjU0MX0.nC7tUGNg8kUvKXdtNtaKZzpAyoLgMNBbCe4dXXx2VyE';

// ✅ SỬA: dùng supabase chứ không phải createClient trực tiếp
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Đăng ký
async function signUp() {
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Lỗi đăng ký: ' + error.message);
  } else {
    alert('✅ Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
    console.log("User registered:", data);
  }
}

// Đăng nhập
async function signIn() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('❌ Lỗi đăng nhập: ' + error.message);
  } else {
    alert('✅ Đăng nhập thành công!');
    console.log('Access Token:', data.session.access_token);
  }
}

// Lấy thông tin user
async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    alert('Lỗi: ' + error.message);
    return;
  }

  const userInfoEl = document.getElementById('user-info');
  userInfoEl.textContent = JSON.stringify(data.user, null, 2);
  console.log("User info:", data.user);
}

// Đăng xuất
async function signOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert('❌ Lỗi khi đăng xuất: ' + error.message);
  } else {
    alert('✅ Đã đăng xuất thành công.');
    document.getElementById('user-info').textContent = '';
  }
}
