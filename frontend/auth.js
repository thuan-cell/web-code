const SUPABASE_URL = 'https://sbujprduupfyohscibck.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWpwcmR1dXBmeW9oc2NpYmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA1NDEsImV4cCI6MjA2NDA3NjU0MX0.nC7tUGNg8kUvKXdtNtaKZzpAyoLgMNBbCe4dXXx2VyE';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Đăng ký
async function signUp() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert('Lỗi đăng ký: ' + error.message);
  } else {
    alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
  }
}

// Đăng nhập
async function signIn() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Lỗi đăng nhập: ' + error.message);
  } else {
    alert('Đăng nhập thành công!');
    console.log('Access Token:', data.session.access_token);
  }
}

// Lấy thông tin user
async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    alert('Lỗi: ' + error.message);
    return;
  }
  document.getElementById('user-info').textContent = JSON.stringify(user, null, 2);
}

// Đăng xuất
async function signOut() {
  await supabase.auth.signOut();
  alert('Đã đăng xuất');
}
