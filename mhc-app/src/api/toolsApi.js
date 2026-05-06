import { authHeader } from '../utils/auth';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function fetchTools() {
  const res = await fetch(`${BASE}/tools`);
  if (!res.ok) throw new Error('Không thể tải danh sách tools');
  return res.json();
}

export async function createTool(tool) {
  const res = await fetch(`${BASE}/tools`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(tool),
  });
  if (!res.ok) throw new Error('Không thể tạo tool');
  return res.json();
}

export async function updateTool(id, tool) {
  const res = await fetch(`${BASE}/tools/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(tool),
  });
  if (!res.ok) throw new Error('Không thể cập nhật tool');
  return res.json();
}

export async function deleteTool(id) {
  const res = await fetch(`${BASE}/tools/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Không thể xóa tool');
  return res.json();
}

export async function fetchToolDetail(id) {
  const res = await fetch(`${BASE}/tools/${id}/detail`);
  if (!res.ok) throw new Error('Không thể tải chi tiết tool');
  return res.json();
}

export async function saveToolDetail(id, data) {
  const res = await fetch(`${BASE}/tools/${id}/detail`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Không thể lưu chi tiết tool');
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại');
  return data;
}

export async function uploadLogo(file) {
  const form = new FormData();
  form.append('logo', file);
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: authHeader(),
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload thất bại');
  return data.url;
}

export async function register(username, email, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Đăng ký thất bại');
  return data;
}
