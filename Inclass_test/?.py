import pandas as pd
import re

# 原始資料字串
raw_data = """
2025/12/1 上午 8:36:37mchen1@g.nccu.edu.tw陳美吾FA25 孝-1班淦波帆2025/12/1下午 2:10:00病假FA25 職場中文單班課
2025/12/1 上午 10:03:57johant@g.nccu.edu.tw曾若涵FA25 孝-1班詹彬禮2025/12/1心理假FA25 職場中文單班課
2025/12/1 上午 10:05:41johant@g.nccu.edu.tw曾若涵FA25 仁-2班貝責2025/11/28心理假FA25 職場中文大班課
2025/12/1 上午 10:06:21johant@g.nccu.edu.tw曾若涵FA25 愛-1班江雨川2025/11/28心理假FA25 職場中文單班課
2025/12/1 上午 10:06:58johant@g.nccu.edu.tw曾若涵FA25 仁-1班梁安妮2025/11/28心理假FA25 職場中文大班課
2025/12/1 上午 10:07:30johant@g.nccu.edu.tw曾若涵FA25 仁-1班梁安妮2025/11/28心理假FA25 職場中文中班課
2025/12/1 下午 4:42:22yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班楊子璇2025/11/24心理假FA25 職場中文大班課
2025/12/1 下午 4:42:41yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班楊子璇2025/11/24心理假FA25 職場中文中班課
2025/12/1 下午 4:43:01yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班郭吉達2025/11/24心理假FA25 職場中文大班課
2025/12/1 下午 4:43:22yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班郭吉達2025/11/24心理假FA25 職場中文中班課
2025/12/1 下午 4:45:15yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班淦波帆2025/12/1病假FA25 職場中文大班課
2025/12/1 下午 4:45:05yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班淦波帆2025/12/1病假FA25 職場中文中班課
2025/12/1 下午 4:44:19yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班詹彬禮2025/12/1心理假FA25 職場中文大班課
2025/12/1 下午 4:44:38yy87@g.nccu.edu.tw楊元嘉FA25 孝-1班詹彬禮2025/12/1心理假FA25 職場中文中班課
2025/12/1 下午 4:45:33yy87@g.nccu.edu.tw楊元嘉FA25 孝-2班馬麗莎2025/12/1病假FA25 職場中文大班課
2025/12/1 下午 4:45:55yy87@g.nccu.edu.tw楊元嘉FA25 孝-2班馬麗莎2025/12/1病假FA25 職場中文中班課
2025/12/2 上午 11:18:20rtshih@g.nccu.edu.tw施睿庭FA25 忠-2班賀新2025/11/28公假（限實習面試、必要中心活動出席，由劉老師確認）中心活動活動
2025/12/2 上午 11:18:54rtshih@g.nccu.edu.tw施睿庭FA25 忠-2班柯海琳2025/11/28病假中心活動活動
2025/12/2 上午 11:19:26rtshih@g.nccu.edu.tw施睿庭FA25 孝-2班馬麗莎2025/11/28病假中心活動活動
2025/12/3 上午 8:41:01s.w.liao@g.nccu.edu.tw廖邵瑋FA25 孝-1班淦波帆2025/12/3病假FA25 專業獨立研究（only for Group 1）大班課
2025/12/3 上午 8:41:23s.w.liao@g.nccu.edu.tw廖邵瑋FA25 孝-1班淦波帆2025/12/3病假FA25 專業獨立研究（only for Group 1）中班課
2025/12/3 上午 10:38:10mchen1@g.nccu.edu.tw陳美吾FA25 孝-1班淦波帆2025/12/3下午 2:10:00病假FA25 專業獨立研究（only for Group 1）單班課
2025/12/3 下午 3:06:10s.w.liao@g.nccu.edu.tw廖邵瑋FA25 孝-2班馬麗莎2025/12/3病假FA25 專業獨立研究（only for Group 1）中班課
2025/12/5 上午 8:41:28ruyin@g.nccu.edu.tw王如音FA25 愛-1班郭恩美2025/12/5下午 3:10:00病假FA25 職場中文單班課
2025/12/5 上午 8:42:20mchen1@g.nccu.edu.tw陳美吾FA25 愛-1班郭恩美2025/12/5上午 11:10:00病假FA25 職場中文中班課
2025/12/5 上午 8:43:10mchen1@g.nccu.edu.tw陳美吾FA25 愛-2班羅福山2025/12/5下午 2:10:00心理假FA25 職場中文中班課
2025/12/5 上午 8:43:37mchen1@g.nccu.edu.tw陳美吾FA25 愛-2班麥世寧2025/12/5下午 2:10:00心理假FA25 職場中文中班課
2025/12/5 上午 8:44:15mchen1@g.nccu.edu.tw陳美吾FA25 愛-2班蘇蘭珺2025/12/5下午 2:10:00心理假FA25 職場中文中班課
"""

parsed_data = []
lines = raw_data.strip().split('\n')

for line in lines:
    try:
        # 使用正規表達式提取各個欄位
        # 1. 提取班級 (FA25 開頭，接任意字元直到 "-數字班")
        class_match = re.search(r'(FA25 [^ ]+-[0-9]班)', line)
        if not class_match: continue
        
        student_class = class_match.group(1)
        start_idx = class_match.start()
        end_idx = class_match.end()
        
        # 2. 提取教師姓名 (在 Email 結尾和班級開頭之間)
        pre_class = line[:start_idx]
        email_match = re.search(r'(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', pre_class)
        teacher_name = pre_class[email_match.end():].strip() if email_match else "Unknown"

        # 3. 提取其他資訊 (在班級之後)
        post_class = line[end_idx:]
        
        # 尋找日期 (例如 2025/12/1)
        date_match = re.search(r'(\d{4}/\d{1,2}/\d{1,2})', post_class)
        if not date_match: continue
        
        date_str = date_match.group(1)
        student_name = post_class[:date_match.start()].strip()
        
        # 處理剩餘部分：時間 + 假別 + 課程 + 課程類型
        rest = post_class[date_match.end():]
        
        # 定義可能的假別關鍵字
        leave_keywords = ['病假', '心理假', '公假']
        found_leave = None
        leave_idx = -1
        
        for kw in leave_keywords:
            idx = rest.find(kw)
            if idx != -1:
                found_leave = kw # 簡單化，若包含關鍵字即視為該假別
                leave_idx = idx
                break
        
        if found_leave:
            # 提取缺席時間 (日期與假別之間)
            time_str = rest[:leave_idx].strip()
            if not time_str: time_str = "無"
            
            # 假別全名 (包含括號等)
            # 這裡簡單處理：取關鍵字之後的所有字串作為課程資訊的開始
            # 但要注意 "公假" 後面可能有一長串說明
            # 我們假設假別關鍵字就是分隔點，若要保留完整假別名稱需更細緻處理，這裡依您的表格簡化為主要假別
            leave_type = found_leave
            
            # 處理長字串的公假說明
            if found_leave == '公假' and '由劉老師確認）' in rest:
                # 跳過括號說明
                end_bracket = rest.find('）')
                post_leave = rest[end_bracket+1:]
            else:
                post_leave = rest[leave_idx + len(found_leave):]

            # 提取課程類型 (單班課, 中班課, 大班課, 活動) - 假設在字串末尾
            class_types = ['單班課', '中班課', '大班課', '活動']
            found_ctype = None
            for ct in class_types:
                if post_leave.strip().endswith(ct):
                    found_ctype = ct
                    break
            
            if found_ctype:
                class_type = found_ctype
                course_name = post_leave[:post_leave.rfind(found_ctype)].strip()
            else:
                class_type = ""
                course_name = post_leave.strip()
            
            parsed_data.append({
                "學生班級": student_class,
                "學生姓名": student_name,
                "日期": date_str,
                "出缺勤情況": leave_type,
                "缺席時間": time_str,
                "教師名字": teacher_name,
                "缺席課程": course_name,
                "課程類型": class_type
            })

    except Exception as e:
        print(f"Error parsing line: {line}")

df = pd.DataFrame(parsed_data)

# --- 資料聚合 (Grouping) ---
# 合併規則：同一人、同一天、同一假別、同一課程
def combine_unique(x):
    return ",".join(sorted(set(x)))

def combine_time(x):
    # 如果有多個時間，用換行顯示；如果只有無，則顯示無；如果混合，只顯示有時間的
    times = [t for t in x if t != "無"]
    if not times: return "無"
    return "<br>".join(sorted(set(times)))

grouped_df = df.groupby(['學生班級', '學生姓名', '日期', '出缺勤情況', '缺席課程'], as_index=False).agg({
    '缺席時間': combine_time,
    '教師名字': combine_unique,
    '課程類型': combine_unique
})

# 依照日期排序 (新到舊)
grouped_df['DateObj'] = pd.to_datetime(grouped_df['日期'])
final_df = grouped_df.sort_values('DateObj', ascending=False).drop('DateObj', axis=1)

# 調整欄位順序
cols = ['學生班級', '學生姓名', '日期', '出缺勤情況', '缺席時間', '教師名字', '缺席課程', '課程類型']
final_df = final_df[cols]

# 顯示結果 (Markdown 格式)
print(final_df.to_markdown(index=False))