const base_url = "http://localhost:8000/";

export const homework_default = new URLPattern("/homework", base_url);
export const homework_date = new URLPattern("/homework?date=:date", base_url);
export const update_homework = new URLPattern("/update", base_url);
