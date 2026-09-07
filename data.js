/* ============================================================
 * Word-Master-Harvey · 词库（按 Unit 组织）
 * ------------------------------------------------------------
 * 每个单词的字段：
 *   w       英文单词
 *   ph      音标
 *   cn      中文释义
 *   pos     词性（n. / v. / adj. / adv. / prep. / conj. / pron. / int. / phrase）
 *   ex      英文例句
 *   ec      例句中文
 *   parts   词素拆分 [{ p:片段, g:含义(中英), k:'pre'|'root'|'suf'|'word' }]
 *   story   词根讲解（中文）
 *   storyEn 词根讲解（英文，中英对照用）
 *   fam     同根词 [{ w, cn }]
 *
 * 单元词库由「Unit1-10_词汇归档.xlsx」导入（含词性、中文释义）。
 * 以后可在 App 内「设置 → 单词库导入」通过上传 Excel 或图片更新各单元单词。
 * 新增单元：直接在 UNITS 里加一项即可，u 必须唯一（1..N 连续推荐）。
 * ============================================================ */

const UNITS = [
  {
    "u": 1,
    "name": "Unit 1",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "city",
        "ph": "",
        "cn": "城市",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "tourist",
        "ph": "",
        "cn": "旅行者",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "tour",
        "ph": "",
        "cn": "旅行，旅游",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "clock",
        "ph": "",
        "cn": "钟",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "bell",
        "ph": "",
        "cn": "铃铛",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "model",
        "ph": "",
        "cn": "模范，模特",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "show",
        "ph": "",
        "cn": "展示",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "special",
        "ph": "",
        "cn": "特别的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "amazing",
        "ph": "",
        "cn": "极好的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "ring",
        "ph": "",
        "cn": "鸣（钟）",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Monday",
        "ph": "",
        "cn": "星期一",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Tuesday",
        "ph": "",
        "cn": "星期二",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Wednesday",
        "ph": "",
        "cn": "星期三",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Thursday",
        "ph": "",
        "cn": "星期四",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Friday",
        "ph": "",
        "cn": "星期五",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Saturday",
        "ph": "",
        "cn": "星期六",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Sunday",
        "ph": "",
        "cn": "星期日",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "weekday",
        "ph": "",
        "cn": "工作日",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "weekend",
        "ph": "",
        "cn": "周末",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 2,
    "name": "Unit 2",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "tiny",
        "ph": "",
        "cn": "微小的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "cushion",
        "ph": "",
        "cn": "靠垫",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "pillow",
        "ph": "",
        "cn": "枕头",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "couch",
        "ph": "",
        "cn": "躺椅，（小）沙发",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "living room",
        "ph": "",
        "cn": "客厅，起居室",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "stove",
        "ph": "",
        "cn": "炉灶",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "window",
        "ph": "",
        "cn": "窗户",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "stair",
        "ph": "",
        "cn": "台阶",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "computer",
        "ph": "",
        "cn": "电脑",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "meter",
        "ph": "",
        "cn": "米",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "easy",
        "ph": "",
        "cn": "简单的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "ear",
        "ph": "",
        "cn": "耳朵",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "leg",
        "ph": "",
        "cn": "腿",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "hair",
        "ph": "",
        "cn": "头发",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "foot",
        "ph": "",
        "cn": "脚",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "mouth",
        "ph": "",
        "cn": "嘴",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "eye",
        "ph": "",
        "cn": "眼睛",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "arm",
        "ph": "",
        "cn": "胳膊",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "hand",
        "ph": "",
        "cn": "手",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "head",
        "ph": "",
        "cn": "头",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "nose",
        "ph": "",
        "cn": "鼻子",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "strange",
        "ph": "",
        "cn": "奇怪的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "fruit",
        "ph": "",
        "cn": "水果",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "rock",
        "ph": "",
        "cn": "岩石，石头",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "seashell",
        "ph": "",
        "cn": "贝壳",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "glass",
        "ph": "",
        "cn": "玻璃",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "bottle",
        "ph": "",
        "cn": "瓶子，壶",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "airplane",
        "ph": "",
        "cn": "飞机",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "dinosaur",
        "ph": "",
        "cn": "恐龙",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "upside-down",
        "ph": "",
        "cn": "上下颠倒的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 3,
    "name": "Unit 3",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "travel",
        "ph": "",
        "cn": "旅游，旅行",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "traveller",
        "ph": "",
        "cn": "旅行者",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "interesting",
        "ph": "",
        "cn": "令人感兴趣的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "interested",
        "ph": "",
        "cn": "对……感兴趣的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "love",
        "ph": "",
        "cn": "爱",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "watch",
        "ph": "",
        "cn": "观看",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "difficult",
        "ph": "",
        "cn": "困难的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "easy",
        "ph": "",
        "cn": "简单的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "favorite",
        "ph": "",
        "cn": "最喜爱的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "country",
        "ph": "",
        "cn": "国家，乡村",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "giraffe",
        "ph": "",
        "cn": "长颈鹿",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "beautiful",
        "ph": "",
        "cn": "美丽的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "red",
        "ph": "",
        "cn": "红色的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "color",
        "ph": "",
        "cn": "颜色",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "singer",
        "ph": "",
        "cn": "歌手",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "movie",
        "ph": "",
        "cn": "电影",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "sport",
        "ph": "",
        "cn": "运动",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "yellow",
        "ph": "",
        "cn": "黄色的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "white",
        "ph": "",
        "cn": "白色的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "purple",
        "ph": "",
        "cn": "紫色的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "green",
        "ph": "",
        "cn": "绿色的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "black",
        "ph": "",
        "cn": "黑色的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "take photos",
        "ph": "",
        "cn": "拍照",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "the same as",
        "ph": "",
        "cn": "与……相同",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "different from",
        "ph": "",
        "cn": "与……不同",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 4,
    "name": "Unit 4",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "island",
        "ph": "",
        "cn": "岛",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "boat",
        "ph": "",
        "cn": "船",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "restaurant",
        "ph": "",
        "cn": "餐厅",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "town",
        "ph": "",
        "cn": "小镇",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "hotel",
        "ph": "",
        "cn": "旅馆",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "tourist",
        "ph": "",
        "cn": "旅行者",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "underground",
        "ph": "",
        "cn": "地下的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "hour",
        "ph": "",
        "cn": "小时",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "minute",
        "ph": "",
        "cn": "分钟",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "second",
        "ph": "",
        "cn": "秒",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "everything",
        "ph": "",
        "cn": "（所有的）东西",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "visit",
        "ph": "",
        "cn": "参观，游览",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "live",
        "ph": "",
        "cn": "居住",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "store",
        "ph": "",
        "cn": "商店",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "underwater",
        "ph": "",
        "cn": "水下的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "unusual",
        "ph": "",
        "cn": "不寻常的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "beach",
        "ph": "",
        "cn": "海滩，沙滩",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "famous",
        "ph": "",
        "cn": "著名的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "stay",
        "ph": "",
        "cn": "停留，居留",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "a lot of",
        "ph": "",
        "cn": "许多，大量",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "the number of",
        "ph": "",
        "cn": "……的数量",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 5,
    "name": "Unit 5",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "same",
        "ph": "",
        "cn": "相同的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "seaweed",
        "ph": "",
        "cn": "海草，海藻",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "hide",
        "ph": "",
        "cn": "隐藏，藏",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "body",
        "ph": "",
        "cn": "身体",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "leaf",
        "ph": "",
        "cn": "叶子",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "branch",
        "ph": "",
        "cn": "树枝",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "trunk",
        "ph": "",
        "cn": "树干",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "strange",
        "ph": "",
        "cn": "奇怪的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "stranger",
        "ph": "",
        "cn": "陌生人",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "animal",
        "ph": "",
        "cn": "动物",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "mean",
        "ph": "",
        "cn": "意味着",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "shape",
        "ph": "",
        "cn": "形状",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "owl",
        "ph": "",
        "cn": "猫头鹰",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "left",
        "ph": "",
        "cn": "左边的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "right",
        "ph": "",
        "cn": "右边的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "middle",
        "ph": "",
        "cn": "中间的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "odd",
        "ph": "",
        "cn": "奇怪的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "eat",
        "ph": "",
        "cn": "吃",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "sleep",
        "ph": "",
        "cn": "睡",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "coral",
        "ph": "",
        "cn": "珊瑚",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "tongue",
        "ph": "",
        "cn": "舌头",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "noisy",
        "ph": "",
        "cn": "嘈杂的，吵闹的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "colorful",
        "ph": "",
        "cn": "多彩的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "dangerous",
        "ph": "",
        "cn": "危险的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "safe",
        "ph": "",
        "cn": "安全的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "look like",
        "ph": "",
        "cn": "看起来像……",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 6,
    "name": "Unit 6",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "tradition",
        "ph": "",
        "cn": "传统",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "traditional",
        "ph": "",
        "cn": "传统的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "especially",
        "ph": "",
        "cn": "特别是",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "continue",
        "ph": "",
        "cn": "继续，延续",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "add",
        "ph": "",
        "cn": "添加，增加",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "local",
        "ph": "",
        "cn": "当地的，本地的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "enjoy",
        "ph": "",
        "cn": "享受，享用",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "important",
        "ph": "",
        "cn": "重要的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "popular",
        "ph": "",
        "cn": "流行的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Japanese",
        "ph": "",
        "cn": "日本的／日本人",
        "pos": "adj./n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Hawaii",
        "ph": "",
        "cn": "夏威夷",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "vacation",
        "ph": "",
        "cn": "假日，假期",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "mochi",
        "ph": "",
        "cn": "糯米糍，麻薯",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "grandparent",
        "ph": "",
        "cn": "祖父母",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "member",
        "ph": "",
        "cn": "成员",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "usually",
        "ph": "",
        "cn": "通常",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "aunt",
        "ph": "",
        "cn": "姑妈，舅妈，阿姨",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "family store",
        "ph": "",
        "cn": "家庭商店",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "be called",
        "ph": "",
        "cn": "被叫做……",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 7,
    "name": "Unit 7",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "landscape",
        "ph": "",
        "cn": "风景",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "build",
        "ph": "",
        "cn": "建造",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "building",
        "ph": "",
        "cn": "建筑物",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "real",
        "ph": "",
        "cn": "真实的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "fresh",
        "ph": "",
        "cn": "新鲜的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "interesting",
        "ph": "",
        "cn": "有趣的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "carefully",
        "ph": "",
        "cn": "小心地",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "pineapple",
        "ph": "",
        "cn": "菠萝",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "vegetable",
        "ph": "",
        "cn": "蔬菜",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "other",
        "ph": "",
        "cn": "其他的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "melon",
        "ph": "",
        "cn": "甜瓜",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "watermelon",
        "ph": "",
        "cn": "西瓜",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "below",
        "ph": "",
        "cn": "在……下面",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "homemade",
        "ph": "",
        "cn": "自制的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "rice",
        "ph": "",
        "cn": "大米",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "noodle",
        "ph": "",
        "cn": "面条",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "salad",
        "ph": "",
        "cn": "沙拉",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "bread",
        "ph": "",
        "cn": "面包",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "be made of",
        "ph": "",
        "cn": "由……构成",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "in fact",
        "ph": "",
        "cn": "事实上",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 8,
    "name": "Unit 8",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "dream",
        "ph": "",
        "cn": "梦想",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "enough",
        "ph": "",
        "cn": "足够的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "early",
        "ph": "",
        "cn": "早的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "finish",
        "ph": "",
        "cn": "结束，完成",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "always",
        "ph": "",
        "cn": "总是",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "leave",
        "ph": "",
        "cn": "离开",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "village",
        "ph": "",
        "cn": "村庄",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "history",
        "ph": "",
        "cn": "历史",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "kindergarten",
        "ph": "",
        "cn": "幼儿园",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "college",
        "ph": "",
        "cn": "学院，大学",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "marry",
        "ph": "",
        "cn": "结婚",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "write",
        "ph": "",
        "cn": "写",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "educate",
        "ph": "",
        "cn": "教育",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "geography",
        "ph": "",
        "cn": "地理",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "PE",
        "ph": "",
        "cn": "体育",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "science",
        "ph": "",
        "cn": "科学",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "math",
        "ph": "",
        "cn": "数学",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "art",
        "ph": "",
        "cn": "艺术，美术",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "similarity",
        "ph": "",
        "cn": "相似点",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "get married with",
        "ph": "",
        "cn": "与……结婚",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "after school",
        "ph": "",
        "cn": "放学后",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "elementary school",
        "ph": "",
        "cn": "小学",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "high school",
        "ph": "",
        "cn": "高中",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 9,
    "name": "Unit 9",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "smart",
        "ph": "",
        "cn": "聪明的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "communicate",
        "ph": "",
        "cn": "交流，沟通",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "communication",
        "ph": "",
        "cn": "交流，沟通",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "understand",
        "ph": "",
        "cn": "理解",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "point",
        "ph": "",
        "cn": "指",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "hot",
        "ph": "",
        "cn": "炎热的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "warm",
        "ph": "",
        "cn": "温暖的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "cold",
        "ph": "",
        "cn": "寒冷的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "cool",
        "ph": "",
        "cn": "凉爽的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "like",
        "ph": "",
        "cn": "像……",
        "pos": "prep.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "research",
        "ph": "",
        "cn": "研究",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "human",
        "ph": "",
        "cn": "人类",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "speak",
        "ph": "",
        "cn": "说（后接语言）",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "teach",
        "ph": "",
        "cn": "教",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "distance",
        "ph": "",
        "cn": "距离",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "dolphin",
        "ph": "",
        "cn": "海豚",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "alone",
        "ph": "",
        "cn": "独自的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "group",
        "ph": "",
        "cn": "组合",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "sound",
        "ph": "",
        "cn": "听起来",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "smell",
        "ph": "",
        "cn": "闻起来",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "both",
        "ph": "",
        "cn": "两者",
        "pos": "pron.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "bonobo",
        "ph": "",
        "cn": "倭黑猩猩",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "point to",
        "ph": "",
        "cn": "指向……",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "between A and B",
        "ph": "",
        "cn": "在 A 和 B 中间",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "make a fire",
        "ph": "",
        "cn": "生火",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "play the piano",
        "ph": "",
        "cn": "弹钢琴",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  },
  {
    "u": 10,
    "name": "Unit 10",
    "title": "课本单词",
    "desc": "",
    "words": [
      {
        "w": "pop-up",
        "ph": "",
        "cn": "突然出现的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "create",
        "ph": "",
        "cn": "创造",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "creative",
        "ph": "",
        "cn": "有创造力的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "customer",
        "ph": "",
        "cn": "顾客",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "try",
        "ph": "",
        "cn": "尝试",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "pay",
        "ph": "",
        "cn": "付（钱）",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "buy",
        "ph": "",
        "cn": "买",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "sell",
        "ph": "",
        "cn": "卖",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "instead",
        "ph": "",
        "cn": "而不是",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "common",
        "ph": "",
        "cn": "共同的，共享的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "quiet",
        "ph": "",
        "cn": "安静的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "only",
        "ph": "",
        "cn": "仅仅",
        "pos": "adv.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "business",
        "ph": "",
        "cn": "商业",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "cheap",
        "ph": "",
        "cn": "便宜的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "expensive",
        "ph": "",
        "cn": "贵的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "meal",
        "ph": "",
        "cn": "（一）餐，（一顿）饭",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "single",
        "ph": "",
        "cn": "单一的，单独的",
        "pos": "adj.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "Singapore",
        "ph": "",
        "cn": "新加坡",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "describe",
        "ph": "",
        "cn": "描述",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "explain",
        "ph": "",
        "cn": "解释",
        "pos": "v.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "inference",
        "ph": "",
        "cn": "推断，推理",
        "pos": "n.",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "a few",
        "ph": "",
        "cn": "一些（接可数名词）",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "a little",
        "ph": "",
        "cn": "一些（接不可数名词）",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "TV program",
        "ph": "",
        "cn": "电视节目",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "pay for",
        "ph": "",
        "cn": "为……付钱",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "instead of",
        "ph": "",
        "cn": "而不是",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      },
      {
        "w": "pop-up store",
        "ph": "",
        "cn": "快闪店",
        "pos": "",
        "ex": "",
        "ec": "",
        "parts": [],
        "story": "",
        "storyEn": "",
        "fam": []
      }
    ]
  }
];

/* 词素类型的配色（与 styles.css 中的 .m-* 对应） */
const PART_KIND = {
  pre: { label: '前缀', color: '#8b5cf6' },
  root: { label: '词根', color: '#2f7cf6' },
  suf: { label: '后缀', color: '#22c55e' },
  word: { label: '词', color: '#ff8f3f' }
};

/* 教学构词补充：仅显式匹配；不通过字母前后缀猜测词源。
 * 构词分类参考：https://dictionary.cambridge.org/grammar/british-grammar/word-formation_2
 * 中文解释为本项目编写；word 表示可独立使用的词基，不冒充古典词根。
 */
const WORD_FORMATION = {};
function formation(word, parts, story, family = []) {
  WORD_FORMATION[word] = { parts: parts.map(([p, g, k]) => ({ p, g, k })), story,
    fam: family.map(([w, cn]) => ({ w, cn })) };
}
formation("tourist", [["tour", "旅行", "word"], ["ist", "从事某活动的人", "suf"]], "tour 是旅行，-ist 表示从事某活动的人；tourist 就是旅行者。", [["tour", "旅行"], ["tourism", "旅游业"]]);
formation("computer", [["comput", "计算（compute 去掉 e）", "word"], ["er", "执行动作的人或物", "suf"]], "compute 表示计算，去掉词尾 e 加 -er，得到 computer（计算机）。", [["compute", "计算"]]);
formation("traveller", [["travell", "旅行（travel 双写 l）", "word"], ["er", "执行动作的人或物", "suf"]], "travel 加 -er 表示旅行的人；英式拼写 traveller 双写 l，美式常写 traveler。", [["travel", "旅行"]]);
formation("singer", [["sing", "唱歌", "word"], ["er", "执行动作的人或物", "suf"]], "sing 加 -er，表示唱歌的人，即歌手。", [["sing", "唱歌"]]);
formation("beautiful", [["beauti", "美（beauty 的 y 改 i）", "word"], ["ful", "充满……的", "suf"]], "beauty 的 y 改为 i，再加 -ful，表示美丽的。", [["beauty", "美"]]);
formation("colorful", [["color", "颜色", "word"], ["ful", "充满……的", "suf"]], "color 加 -ful，表示色彩丰富的。", [["color", "颜色"]]);
formation("carefully", [["care", "关心；小心", "word"], ["ful", "充满……的", "suf"], ["ly", "以……的方式", "suf"]], "care → careful（小心的）→ carefully（小心地）。", [["careful", "小心的"], ["care", "关心"]]);
formation("unusual", [["un", "不；相反", "pre"], ["usual", "通常的", "word"]], "un- 放在 usual 前面，表示不寻常的。", [["usual", "通常的"], ["usually", "通常"]]);
formation("usually", [["usual", "通常的", "word"], ["ly", "以……的方式", "suf"]], "usual 加 -ly 构成副词 usually，表示通常。", [["usual", "通常的"]]);
formation("traditional", [["tradition", "传统", "word"], ["al", "与……有关的", "suf"]], "tradition 加 -al，把名词变为形容词：传统的。", [["tradition", "传统"]]);
formation("dangerous", [["danger", "危险", "word"], ["ous", "具有……性质的", "suf"]], "danger 加 -ous，表示危险的。", [["danger", "危险"]]);
formation("noisy", [["nois", "噪声（noise 去掉 e）", "word"], ["y", "具有……特点的", "suf"]], "noise 去掉 e 加 -y，表示吵闹的。", [["noise", "噪声"]]);
formation("interesting", [["interest", "兴趣；使感兴趣", "word"], ["ing", "令人……的", "suf"]], "interesting 描述事物令人感兴趣；interested 描述人感到有兴趣。", [["interest", "兴趣"], ["interested", "感兴趣的"]]);
formation("interested", [["interest", "兴趣；使感兴趣", "word"], ["ed", "感到……的", "suf"]], "interested 表示感到有兴趣，常用 be interested in。", [["interest", "兴趣"], ["interesting", "有趣的"]]);
formation("amazing", [["amaz", "使惊奇（amaze 去掉 e）", "word"], ["ing", "令人……的", "suf"]], "amaze 去掉 e 加 -ing，表示令人惊奇的。", [["amaze", "使惊奇"], ["amazed", "感到惊奇的"]]);
formation("building", [["build", "建造", "word"], ["ing", "构成活动或事物名词", "suf"]], "build 加 -ing；这里 building 是名词，指建筑物。", [["build", "建造"]]);
formation("stranger", [["strang", "陌生的（strange 去掉 e）", "word"], ["er", "表示人", "suf"]], "这里 stranger 是名词“陌生人”；在比较句中也可能是 strange 的比较级。", [["strange", "陌生的；奇怪的"]]);
formation("creative", [["creat", "创造（create 去掉 e）", "word"], ["ive", "具有……性质的", "suf"]], "create 去掉 e 加 -ive，表示有创造力的。", [["create", "创造"]]);
formation("weekday", [["week", "周", "word"], ["day", "天", "word"]], "week（周）和 day（天）合成 weekday，意思是一周中的工作日，通常指周一到周五。", [["week", "周"], ["day", "天"]]);
formation("weekend", [["week", "周", "word"], ["end", "末尾", "word"]], "week（周）和 end（末尾）合成 weekend，意思是周末。", [["week", "周"], ["end", "末尾"]]);
formation("seashell", [["sea", "海", "word"], ["shell", "贝壳", "word"]], "sea（海）和 shell（贝壳）合成 seashell，意思是海贝壳。", [["sea", "海"], ["shell", "贝壳"]]);
formation("airplane", [["air", "空气；空中", "word"], ["plane", "飞机", "word"]], "air（空气；空中）和 plane（飞机）合成 airplane，意思是飞机。", [["air", "空气；空中"], ["plane", "飞机"]]);
formation("underground", [["under", "在……下面", "word"], ["ground", "地面", "word"]], "under（在……下面）和 ground（地面）合成 underground，意思是地下的；也可指地铁。", [["under", "在……下面"], ["ground", "地面"]]);
formation("underwater", [["under", "在……下面", "word"], ["water", "水", "word"]], "under（在……下面）和 water（水）合成 underwater，意思是水下的。", [["under", "在……下面"], ["water", "水"]]);
formation("everything", [["every", "每一个", "word"], ["thing", "事物", "word"]], "every（每一个）和 thing（事物）合成 everything，意思是每件事；一切。", [["every", "每一个"], ["thing", "事物"]]);
formation("seaweed", [["sea", "海", "word"], ["weed", "杂草", "word"]], "sea（海）和 weed（杂草）合成 seaweed，意思是海藻。", [["sea", "海"], ["weed", "杂草"]]);
formation("watermelon", [["water", "水", "word"], ["melon", "瓜", "word"]], "water（水）和 melon（瓜）合成 watermelon，意思是西瓜。", [["water", "水"], ["melon", "瓜"]]);
formation("homemade", [["home", "家", "word"], ["made", "制作的", "word"]], "home（家）和 made（制作的）合成 homemade，意思是自制的。", [["home", "家"], ["made", "制作的"]]);

/* 全词库逐项讲解（2026-09-07）。base 是基础词拓展，phrase 是短语讲解；
 * origin 不保证能按现代拼写拆分。没有可靠拆分时 parts 留空，不能制造伪词根题。
 */
const FORMATION_KIND = { root: '词根讲解', affix: '词缀与派生', compound: '合成词讲解', origin: '词源讲解', base: '基础词与派生', phrase: '短语与缩写' };
const FORMATION_REFERENCE = 'https://dictionary.cambridge.org/grammar/british-grammar/word-formation_2';
Object.values(WORD_FORMATION).forEach(entry => {
  entry.formationKind = entry.parts.some(p => p.k === 'pre' || p.k === 'suf') ? 'affix' : 'compound';
  entry.formationSources = [FORMATION_REFERENCE];
});
function explainWord(word, kind, parts, story, family, sources) {
  formation(word.toLowerCase(), parts, story, family);
  Object.assign(WORD_FORMATION[word.toLowerCase()], { formationKind: kind, formationSources: sources });
}
explainWord("clock", "base", [], "clock 整体表示钟，是可继续组合的词基。alarm clock 是闹钟，clockwork 是钟表机械装置；不要拆成 c + lock（锁）。", [["clockwork", "钟表机械装置"], ["alarm clock", "闹钟"]], []);
explainWord("bell", "base", [], "bell 本身就是铃、钟的词基。doorbell 由 door + bell 构成，是门铃；bell 的双写 l 要一起记。", [["doorbell", "门铃"], ["bell-shaped", "钟形的"]], []);
explainWord("show", "base", [], "show 是完整词基，可以表示展示，也可表示演出。showing 中的 -ing 是词尾变化，showcase 里仍能看到 show。", [["showcase", "展示"], ["showing", "展示；放映"]], []);
explainWord("ring", "base", [], "ring 表示铃声、响铃时可记 ring → rang → rung；表示戒指、环时有另一组用法。不要把字母 ing 当成 -ing 后缀从 r 上拆下来。", [["ringing", "响铃声"], ["ringtone", "铃声"]], []);
explainWord("tiny", "base", [], "tiny 表示极小的，比较级 tinier、最高级 tiniest 把 y 改成 i 再加词尾。它不是 tin（金属锡）加 -y 来表示小。", [["tinier", "更小的"], ["tiniest", "最小的"]], []);
explainWord("cushion", "base", [], "cushion 是完整词基，指坐垫、靠垫，也可作动词表示缓冲。结尾的 ion 在这里不能当作常见名词后缀 -ion，从 cush 上硬拆。", [["cushioned", "有软垫的"], ["cushioning", "缓冲材料"]], []);
explainWord("pillow", "base", [], "pillow 整体表示枕头，可以组成 pillowcase（枕套）。不要从拼写里的 pill 推断它与药丸有关。", [["pillowcase", "枕套"]], []);
explainWord("couch", "base", [], "couch 整体表示长沙发，可与 sofa 对照记忆；不是 co-（共同）加 uch。couch potato 是常窝在沙发上看电视的人这一比喻表达。", [["couch potato", "电视迷；常窝沙发的人"]], []);
explainWord("stove", "base", [], "stove 表示炉子，是完整词基；stovetop 由 stove + top 组成，表示炉灶上面。注意不要与 store（商店）混淆。", [["stovetop", "炉灶面"]], []);
explainWord("stair", "base", [], "stair 指一级楼梯，通常以 stairs 表示楼梯。staircase 和 stairway 保留 stair 这个词基。", [["stairs", "楼梯"], ["staircase", "楼梯；楼梯间"]], []);
explainWord("easy", "base", [], "easy 表示容易的，可与 ease（轻松）联系学习。派生 easily、easiness 时注意 y 改为 i；不是 eas + y 的随意字母拆分。", [["easily", "容易地"], ["easiness", "容易；轻松"]], []);
explainWord("ear", "base", [], "ear 本身表示耳朵，是合成词词基：earphone 是耳机，earache 是耳痛。听到 ear 时可以直接联系身体部位。", [["earphone", "耳机"], ["earache", "耳痛"]], []);
explainWord("leg", "base", [], "leg 是腿的完整词基，也可指桌椅的腿。legless 中 -less 表示没有，不能把 leg 再拆成更小的英语词缀。", [["legless", "无腿的"], ["table leg", "桌腿"]], []);
explainWord("hair", "base", [], "hair 整体表示头发或毛发。haircut = hair + cut，是剪发；hairless 加 -less，表示无毛的。", [["haircut", "剪发"], ["hairless", "无毛的"]], []);
explainWord("foot", "base", [], "foot 是脚的词基，复数 feet 是内部元音变化，不是加普通 -s。footprint、football 都保留 foot。", [["feet", "脚（复数）"], ["footprint", "脚印"]], []);
explainWord("mouth", "base", [], "mouth 本身表示嘴。mouthful 的 -ful 表示一口的量，mouthwash 是漱口水；不要把末尾 th 当作可随意分离的后缀。", [["mouthful", "一口的量"], ["mouthwash", "漱口水"]], []);
explainWord("eye", "base", [], "eye 是眼睛的词基，eyeball = eye + ball，eyelid = eye + lid。eye 的三个字母共同组成这个词，不再作词缀切分。", [["eyeball", "眼球"], ["eyelid", "眼睑"]], []);
explainWord("arm", "base", [], "arm 表示胳膊时可组成 armchair（扶手椅）、armband（臂带）。表示武装、武器的 arm/arms 有不同的历史来源，不能一概解释成胳膊。", [["armchair", "扶手椅"], ["armband", "臂带"]], []);
explainWord("hand", "base", [], "hand 是手的词基，可组成 handbag（手提包）、handwriting（手写）。hand 的词义也可扩展到帮助、递交，要结合上下文。", [["handbag", "手提包"], ["handwriting", "手写；笔迹"]], []);
explainWord("head", "base", [], "head 是头的词基，可组成 headache（头痛）、headteacher（校长）。词义也可扩展为前端、负责人。", [["headache", "头痛"], ["headteacher", "校长"]], []);
explainWord("nose", "base", [], "nose 是鼻子的词基。nosebleed = nose + bleed，表示鼻出血；nose 的词尾 e 在基本形式中要保留。", [["nosebleed", "鼻出血"]], []);
explainWord("strange", "base", [], "strange 表示奇怪的、陌生的，是现代派生词的词基。strangely 加 -ly，strangeness 加 -ness；stranger 作陌生人时不是“更奇怪”的唯一解释。", [["strangely", "奇怪地"], ["stranger", "陌生人"]], []);
explainWord("fruit", "base", [], "fruit 是水果的完整词基。fruitful 加 -ful，常比喻成果丰富的；fruitless 加 -less，常比喻没有成果的。", [["fruitful", "成果丰硕的"], ["fruitless", "无结果的"]], []);
explainWord("rock", "base", [], "rock 表示岩石时可派生 rocky（多岩石的）。rock 也能表示摇动或摇滚乐，学习本课“岩石”时先固定这一词义。", [["rocky", "多岩石的"], ["rock climber", "攀岩者"]], []);
explainWord("glass", "base", [], "glass 是玻璃的词基。glassware 中 -ware 指某类用品；a glass 可指一个玻璃杯，glasses 还可指眼镜。", [["glassware", "玻璃器皿"], ["glasses", "眼镜"]], []);
explainWord("bottle", "base", [], "bottle 整体表示瓶子，也可作动词“装瓶”。bottled 表示瓶装的，bottling 表示装瓶，注意去掉不发音 e 后加 -ing。", [["bottled", "瓶装的"], ["bottling", "装瓶"]], []);
explainWord("travel", "base", [], "travel 是旅行的完整词基；traveller 在英式拼写中双写 l 加 -er，美式 traveler 常只写一个 l。不要把它解释成 tra + vel。", [["traveller", "旅行者"], ["traveling", "旅行（美式形式）"]], []);
explainWord("love", "base", [], "love 是爱的词基，lovely、loveless、lover 都与它相关。lovely 表示可爱的、美好的，其中 -ly 构成形容词，不是所有 -ly 词都是副词。", [["lovely", "可爱的"], ["loveless", "没有爱的"]], []);
explainWord("watch", "base", [], "watch 表示观看时可加 -er 得 watcher（观看者）；它也可表示手表。watching 保留完整的 watch 再加 -ing。", [["watcher", "观看者"], ["watching", "观看"]], []);
explainWord("country", "base", [], "country 整体表示国家，也可在 the country 中表示乡村。countryside = country + side，注意不要把 country 当作 count（数数）加后缀。", [["countryside", "乡村"], ["countrywide", "全国范围的"]], []);
explainWord("giraffe", "base", [], "giraffe 是长颈鹿的完整动物名称，不按英语前缀和后缀拆分。记住词中双 f，复数一般为 giraffes。", [["giraffes", "长颈鹿（复数）"]], []);
explainWord("red", "base", [], "red 是红色的词基。reddish 加表示有点的 -ish 时双写 d，redness 则加 -ness 表示红的状态。", [["reddish", "微红的"], ["redness", "红色；发红"]], []);
explainWord("color", "base", [], "color 是颜色的词基，英式常写 colour。colorful 加 -ful 表示多彩的，colorless 加 -less 表示无色的。", [["colorful", "多彩的"], ["colorless", "无色的"]], []);
explainWord("sport", "base", [], "sport 表示运动，sports 中的 s 是复数或组合用法；sportswear 表示运动服装。sport 本身不拆成 s + port（港口）。", [["sportswear", "运动服"], ["sportsman", "运动员"]], []);
explainWord("yellow", "base", [], "yellow 是黄色的词基。yellowish 加 -ish 表示略黄的；字母结尾 low 不表示“低”。", [["yellowish", "微黄的"]], []);
explainWord("white", "base", [], "white 是白色的词基。whiten 去掉 e 加 -en 表示使变白，whiteness 表示白的状态。", [["whiten", "使变白"], ["whiteness", "白；洁白"]], []);
explainWord("purple", "base", [], "purple 整体表示紫色。purplish 去掉 e 加 -ish，表示略带紫色的；不能从 pur 或 ple 推出紫色。", [["purplish", "略带紫色的"]], []);
explainWord("green", "base", [], "green 是绿色的词基，greenhouse = green + house，指温室；greenish 加 -ish 表示略绿的。", [["greenhouse", "温室"], ["greenish", "微绿的"]], []);
explainWord("black", "base", [], "black 是黑色的词基。blackboard 由 black + board 构成，blacken 加 -en 表示变黑或使变黑。", [["blackboard", "黑板"], ["blacken", "使变黑"]], []);
explainWord("island", "base", [], "island 表示岛，是现代整体词基，islander 加 -er 表示岛民。拼写中的 s 不发音，不应把 is + land 解释成“是陆地”。", [["islander", "岛民"], ["islands", "岛屿（复数）"]], []);
explainWord("boat", "base", [], "boat 是船的词基，boathouse = boat + house（船屋），boatman 表示船夫。boat 的 oa 一起记。", [["boathouse", "船屋"], ["boatman", "船夫"]], []);
explainWord("town", "base", [], "town 表示城镇，可以组成 hometown（家乡）、townspeople（镇民）。它本身无需再作英语词缀拆分。", [["hometown", "家乡"], ["townspeople", "镇民"]], []);
explainWord("hotel", "base", [], "hotel 是旅馆的完整词基。hotel room 是旅馆房间；不要用 hot（热）加 el 来解释它。", [["hotel room", "旅馆房间"]], []);
explainWord("hour", "base", [], "hour 表示小时，词首 h 不发音，所以说 an hour。hourly 中 -ly 可表示每小时的或每小时地。", [["hourly", "每小时的；每小时地"]], []);
explainWord("minute", "base", [], "minute 表示分钟时整体记忆；同样的拼写也可表示微小的，但发音不同。学习计时单位时可联想 one minute = sixty seconds。", [["minutes", "分钟（复数）"]], []);
explainWord("second", "base", [], "second 表示秒时是一种时间单位，也可表示第二。表示第二次、第二点的 secondly 加 -ly，不能把 sec 当作本词中的独立英语单词。", [["secondly", "第二；其次"]], []);
explainWord("live", "base", [], "live 作动词表示居住、生活，可加 -ing 得 living；表示活的、现场直播的 live 发音不同。按本课“居住”的动词用法记。", [["living", "活着的；生活"], ["livable", "宜居的"]], []);
explainWord("store", "base", [], "store 表示商店，也可表示储存，storage 是相关名词。bookstore = book + store，表示书店。", [["bookstore", "书店"], ["storage", "储存"]], []);
explainWord("beach", "base", [], "beach 是海滩的词基，beachfront = beach + front，表示海滨地带。ch 是词中拼写的一部分，不是词缀。", [["beachfront", "海滨"], ["beachcomber", "海滩拾荒者"]], []);
explainWord("stay", "base", [], "stay 是停留的词基。stayed、staying 是时态或形式变化，不需要删除 y；stay at a hotel 是住旅馆。", [["stayed", "停留（过去式）"], ["staying", "停留"]], []);
explainWord("same", "base", [], "same 整体表示相同的，sameness 加 -ness 表示相同性。常见搭配 the same as，the 和 as 也要一起掌握。", [["sameness", "相同"], ["the same as", "与……相同"]], []);
explainWord("hide", "base", [], "hide 表示躲藏，变化为 hid、hidden；hiding 去掉 e 加 -ing。不要把隐藏的意思归给字母 hi。", [["hidden", "隐藏的"], ["hiding", "躲藏"]], []);
explainWord("body", "base", [], "body 是身体的词基，复数 bodies 把 y 改 i 加 -es。bodyguard = body + guard，是保镖。", [["bodyguard", "保镖"], ["bodily", "身体的"]], []);
explainWord("leaf", "base", [], "leaf 是叶子的词基，复数通常把 f 改为 ves，成为 leaves。leafy 加 -y 表示多叶的。", [["leaves", "叶子（复数）"], ["leafy", "多叶的"]], []);
explainWord("branch", "base", [], "branch 表示树枝，也能比喻分支机构。branching 加 -ing 可表示分叉；branch 本身整体记。", [["branching", "分叉"], ["branches", "树枝；分支"]], []);
explainWord("trunk", "base", [], "trunk 指树干时整体记；它也可指象鼻、行李箱，要结合课文区分。tree trunk 就是树干。", [["tree trunk", "树干"]], []);
explainWord("mean", "base", [], "mean 表示意思是，是完整动词词基；meaning 加 -ing 形成“意思、含义”这个名词。mean 还可表示刻薄的，不能混用。", [["meaning", "意思"], ["meaningful", "有意义的"]], []);
explainWord("shape", "base", [], "shape 是形状的词基，也可作动词塑造。shapeless 保留 e 加 -less 表示不成形的，reshape 中 re- 表示重新。", [["shapeless", "不成形的"], ["reshape", "重新塑造"]], []);
explainWord("owl", "base", [], "owl 是猫头鹰的完整动物名称。owlet 表示小猫头鹰，其中 -let 表示小；基础词 owl 不再硬拆。", [["owlet", "小猫头鹰"]], []);
explainWord("left", "base", [], "left 表示左边时整体记；left-handed 表示惯用左手的。left 也可能是 leave 的过去式，要根据句子判断。", [["left-handed", "惯用左手的"], ["leftmost", "最左边的"]], []);
explainWord("right", "base", [], "right 表示右边时可组成 right-handed；它也能表示正确的、权利。学习方向时与 left 成对记。", [["right-handed", "惯用右手的"], ["rightmost", "最右边的"]], []);
explainWord("middle", "base", [], "middle 是中间的完整词基。middle-aged 表示中年的；不要把 middle 的 -le 当作能自由添加的后缀。", [["middle-aged", "中年的"], ["middleman", "中间人"]], []);
explainWord("odd", "base", [], "odd 表示奇怪的、奇数的；oddly 加 -ly 表示奇怪地，oddness 加 -ness 表示古怪。", [["oddly", "奇怪地"], ["oddness", "古怪"]], []);
explainWord("eat", "base", [], "eat 是吃的词基，变化为 ate、eaten。eater 加 -er 表示吃的人；这些变化比猜测单字母词根更有帮助。", [["eater", "食者"], ["eaten", "吃（过去分词）"]], []);
explainWord("sleep", "base", [], "sleep 是睡觉的词基，过去式 slept；sleepy 加 -y 表示困倦的，sleepless 加 -less 表示无眠的。", [["sleepy", "困倦的"], ["sleepless", "无眠的"]], []);
explainWord("coral", "base", [], "coral 是珊瑚的完整名称。coral reef 是珊瑚礁；词尾 al 在这里不能简单拆为普通形容词后缀。", [["coral reef", "珊瑚礁"]], []);
explainWord("tongue", "base", [], "tongue 整体表示舌头，也可引申为语言，如 mother tongue（母语）。注意 tongue 的 ue 保留在拼写中。", [["mother tongue", "母语"], ["tongue-tied", "张口结舌的"]], []);
explainWord("safe", "base", [], "safe 是安全的词基，safely 加 -ly 表示安全地，safety 保留 e 加 -ty 表示安全这一状态。", [["safely", "安全地"], ["safety", "安全"]], []);
explainWord("add", "base", [], "add 是添加的完整词基。added、adding 保留双 d；addition 表示加法、添加，可与 add 成组记忆。", [["addition", "添加；加法"], ["additional", "额外的"]], []);
explainWord("Hawaii", "base", [], "Hawaii 是地名夏威夷，不能按英语字母硬拆词根。Hawaiian 表示夏威夷的或夏威夷人；地名和派生名称都大写首字母。", [["Hawaiian", "夏威夷的；夏威夷人"]], []);
explainWord("mochi", "base", [], "mochi 是食品名称麻糬，按完整名称记忆，不把 mo 或 chi 当作英语词根。可结合 rice cake（米糕）理解这类食物。", [["mochi ice cream", "麻糬冰淇淋"]], []);
explainWord("member", "base", [], "member 是成员的完整词基。membership 加 -ship 表示成员身份、会员资格；不要把 -er 解释为加在 memb 这个英语动词后的动作执行者。", [["membership", "会员资格；成员身份"]], []);
explainWord("aunt", "base", [], "aunt 是姨母、姑母、舅母等亲属称谓的词基。auntie 是亲昵称呼；它与 uncle 可作为亲属词汇一起记。", [["auntie", "阿姨（亲昵称呼）"]], []);
explainWord("build", "base", [], "build 是建造的词基，过去式和过去分词是 built。builder 加 -er 指建造者，building 加 -ing 可表示建筑物。", [["builder", "建造者"], ["building", "建筑物"]], []);
explainWord("fresh", "base", [], "fresh 是新鲜的词基，freshness 加 -ness 表示新鲜程度，freshen 加 -en 表示使清新。", [["freshness", "新鲜"], ["freshen", "使清新"]], []);
explainWord("other", "base", [], "other 整体表示其他的。another 是与 an 相结合的词，others 是代词复数形式；other 的 -er 不是比较级。", [["another", "另一个"], ["others", "其他人或物"]], []);
explainWord("melon", "base", [], "melon 是瓜类名称的词基，watermelon = water + melon。melon 的 -on 不在这里单独表示某种性质。", [["watermelon", "西瓜"]], []);
explainWord("rice", "base", [], "rice 整体表示米、米饭，通常作不可数名词。rice bowl、rice cake 是词语组合，不是给 rice 添加后缀。", [["rice bowl", "饭碗"], ["rice cake", "米糕"]], []);
explainWord("noodle", "base", [], "noodle 是面条的完整名称，通常用复数 noodles。noodle soup 是面汤；不要把 -le 当作本词中有确定含义的英语后缀。", [["noodles", "面条"], ["noodle soup", "面汤"]], []);
explainWord("salad", "base", [], "salad 整体表示沙拉，fruit salad 是水果沙拉。现代词形不拆成 sal + ad 两个英语词。", [["fruit salad", "水果沙拉"]], []);
explainWord("bread", "base", [], "bread 是面包的词基，通常不可数。breadcrumb = bread + crumb，表示面包屑；不能按 b + read（阅读）理解。", [["breadcrumb", "面包屑"], ["breadmaker", "面包机；面包师"]], []);
explainWord("dream", "base", [], "dream 是梦的词基，也可作动词。dreamer 加 -er 表示做梦的人，dreamless 加 -less 表示无梦的。", [["dreamer", "梦想者"], ["dreamless", "无梦的"]], []);
explainWord("enough", "base", [], "enough 整体表示足够，不把 en- 当作常见使动前缀。enough food 中放在名词前，warm enough 中放在形容词后，注意不同语序。", [["good enough", "足够好"]], []);
explainWord("early", "base", [], "early 表示早的、早地，与 ear（耳朵）没有现代构词关系。比较级 earlier、最高级 earliest 把 y 改为 i。", [["earlier", "更早的；更早地"], ["earliest", "最早的"]], []);
explainWord("leave", "base", [], "leave 表示离开时变化为 left，leaving 去掉 e 加 -ing。它也可表示留下，要按搭配判断，不把词尾 -e 单独赋义。", [["leaving", "离开"], ["leave behind", "留下"]], []);
explainWord("village", "base", [], "village 表示村庄，是现代派生的词基，villager 加 -er 表示村民。不要把 vill 当作一个独立英语单词来猜测。", [["villager", "村民"]], []);
explainWord("college", "base", [], "college 整体表示学院、大学等学校名称。college student 是大学生；末尾 -ege 不是可自由组合的英语后缀。", [["college student", "大学生"]], []);
explainWord("marry", "base", [], "marry 是结婚的词基，married 把 y 改 i 加 -ed。marry someone 是与某人结婚；描述状态通常用 be married to someone。", [["married", "已婚的"], ["marriage", "婚姻"]], []);
explainWord("write", "base", [], "write 是写的词基，变化为 wrote、written。writer 去掉 e 加 -er 表示作者，rewrite 的 re- 表示重新。", [["writer", "作者"], ["rewrite", "重写"]], []);
explainWord("PE", "base", [], "PE 是 physical education（体育教育）的首字母缩写，不是词根或前缀。education 与 educate（教育）相关，缩写保留大写。", [["physical education", "体育教育"]], []);
explainWord("math", "base", [], "math 是 mathematics 的缩写，美式常用 math，英式常用 maths。缩略词本身不拆 ma + th。", [["mathematics", "数学"], ["math teacher", "数学老师"]], []);
explainWord("art", "base", [], "art 是艺术的词基。artist 加 -ist 表示艺术家，artistic 表示艺术的；不要把 art 和拼写中包含 art 的任何词都当作同根。", [["artist", "艺术家"], ["artistic", "艺术的"]], []);
explainWord("smart", "base", [], "smart 表示聪明的时整体记，smartness 加 -ness 表示聪明、机敏。smartphone 由 smart + phone 组成，指智能手机。", [["smartness", "聪明；机敏"], ["smartphone", "智能手机"]], []);
explainWord("point", "base", [], "point 是点、指向的词基。pointer 加 -er 可表示指针、指示物，pointless 加 -less 表示无意义的。", [["pointer", "指针"], ["pointless", "无意义的"]], []);
explainWord("hot", "base", [], "hot 是热的词基，hotter、hottest 加比较词尾时双写 t。它不是 h + ot 的构词组合。", [["hotter", "更热的"], ["hottest", "最热的"]], []);
explainWord("warm", "base", [], "warm 是温暖的词基。warmly 加 -ly 表示温暖地或热情地，warmth 是温暖这个名词，可一起记。", [["warmly", "温暖地；热情地"], ["warmth", "温暖"]], []);
explainWord("cold", "base", [], "cold 是冷的词基，coldness 加 -ness 表示寒冷或冷淡。cold-blooded 由 cold 与 blood 的派生形式组合，可表示冷血的。", [["coldness", "寒冷；冷淡"], ["cold-blooded", "冷血的"]], []);
explainWord("cool", "base", [], "cool 是凉爽的词基，也可表示冷静的。cooler 可作比较级，也可指冷却器；根据上下文选择含义。", [["coolness", "凉爽；冷静"], ["cooler", "冷却器"]], []);
explainWord("like", "base", [], "like 作动词表示喜欢时可派生 dislike（不喜欢）；作介词可表示像。likely 的意思是可能的，不应机械理解为“喜欢地”。", [["dislike", "不喜欢"], ["liking", "喜爱"]], []);
explainWord("speak", "base", [], "speak 是说话的词基，变化为 spoke、spoken。speaker 加 -er 表示说话者或扬声器，speech 是相关名词，拼写已有变化。", [["speaker", "说话者；扬声器"], ["speech", "演讲；言语"]], []);
explainWord("teach", "base", [], "teach 是教的词基，过去式和过去分词是 taught。teacher 加 -er 表示教师，teaching 加 -ing 表示教学。", [["teacher", "教师"], ["teaching", "教学"]], []);
explainWord("dolphin", "base", [], "dolphin 是海豚的完整动物名称，不以英语词缀把 dol 和 phin 分开解释。注意 ph 拼写通常对应 /f/ 音。", [["dolphins", "海豚（复数）"]], []);
explainWord("group", "base", [], "group 是群、组的词基，也可作动词分组。grouping 加 -ing 表示分组，regroup 加 re- 表示重新集合。", [["grouping", "分组"], ["regroup", "重新集合"]], []);
explainWord("sound", "base", [], "sound 表示声音时是完整词基，soundless 加 -less 表示无声的。sound 还可表示健全的，那一用法应与声音义区分。", [["soundless", "无声的"], ["soundtrack", "音轨；原声带"]], []);
explainWord("smell", "base", [], "smell 是气味、闻的词基，smelly 加 -y 表示有难闻气味的。词中的 ll 在 smelly 中保留。", [["smelly", "有臭味的"], ["smelling", "闻"]], []);
explainWord("both", "base", [], "both 整体表示两者都，常与 and 配合：both A and B。末尾 th 不是表示第几的序数词后缀。", [["both sides", "两边"]], []);
explainWord("bonobo", "base", [], "bonobo 是倭黑猩猩的完整动物名称，不把 bono 或 bo 当作英语词根。复数可写 bonobos。", [["bonobos", "倭黑猩猩（复数）"]], []);
explainWord("try", "base", [], "try 是尝试的词基，tries、tried 将 y 改为 i，但 trying 保留 y。try to do 表示努力做，try doing 可表示试着用某种办法。", [["tried", "尝试（过去式）"], ["trying", "尝试"]], []);
explainWord("pay", "base", [], "pay 是支付的词基，过去式和过去分词通常是 paid。payment 加 -ment 表示付款；不要写成常规的 payed 来表达付款。", [["payment", "付款"], ["paid", "支付（过去式）"]], []);
explainWord("buy", "base", [], "buy 是买的词基，过去式和过去分词是 bought。buyer 加 -er 表示买家，buying 保留 y。", [["buyer", "买家"], ["bought", "买（过去式）"]], []);
explainWord("sell", "base", [], "sell 是卖的词基，过去式和过去分词是 sold。seller 加 -er 表示卖家；与 buyer 对照区分。", [["seller", "卖家"], ["sold", "卖（过去式）"]], []);
explainWord("common", "base", [], "common 表示共同的、常见的，是现代完整词基。与 communicate、community 的共享含义相关，但不要把 common 拆成 com + mon 并随意解释 mon。", [["commonly", "通常；普遍地"], ["uncommon", "不常见的"]], []);
explainWord("quiet", "base", [], "quiet 是安静的词基，quietly 加 -ly 表示安静地，quietness 加 -ness 表示安静。注意与 quite（相当）区别拼写。", [["quietly", "安静地"], ["quietness", "安静"]], []);
explainWord("cheap", "base", [], "cheap 是便宜的词基。cheaply 加 -ly 表示便宜地，cheapen 加 -en 表示使贬值或使便宜。", [["cheaply", "便宜地"], ["cheapen", "使贬值"]], []);
explainWord("meal", "base", [], "meal 是一餐的词基。mealtime = meal + time，表示用餐时间；不能拆成 me + al。", [["mealtime", "用餐时间"]], []);
explainWord("single", "base", [], "single 整体表示单个的、单身的。singly 将词尾 le 换成 ly，表示单独地；不是 sing（唱歌）加 le。", [["singly", "单独地"], ["single-room", "单人房的"]], []);
explainWord("Singapore", "base", [], "Singapore 是新加坡这一地名，不按英语 sing（唱歌）加 pore（毛孔）解释。Singaporean 表示新加坡的或新加坡人。", [["Singaporean", "新加坡的；新加坡人"]], []);
explainWord("living room", "phrase", [], "living 来自 live 去掉 e 加 -ing，room 是房间；living room 是供日常起居的房间，即客厅。这里的 living 表示生活、起居，不能机械译作活着的房间。", [["live", "生活"], ["room", "房间"]], []);
explainWord("upside-down", "phrase", [], "upside down 表示上下颠倒。可联系 up（上）、side（面）和 down（下）记忆；这是固定组合，不是拉丁词根。作定语时常用连字符形式 upside-down。", [["up", "向上"], ["down", "向下"]], []);
explainWord("take photos", "phrase", [], "take photos 整体表示拍照。photos 是 photo 的复数，photo 是 photograph 的缩写；phot-/photo- 表示光，-graph 与记录有关。take 在此不译成拿走。", [["photo", "照片"], ["photograph", "照片"]], []);
explainWord("the same as", "phrase", [], "the same as 表示与……相同，same 是相同的，as 引出比较对象。固定搭配中的 the 不要漏掉，也不必把整组词当作一个词根。", [["same", "相同的"], ["sameness", "相同"]], []);
explainWord("different from", "phrase", [], "different from 表示与……不同。different 的词源有 dif-（dis- 的变体，分开）、fer（带）和形容词词尾 -ent；“分开”引出不同，from 在这里引出比较对象。", [["differ", "不同"], ["difference", "区别"]], []);
explainWord("a lot of", "phrase", [], "a lot of 表示许多、大量，可接可数名词复数或不可数名词。lot 在此表示一批、许多；这是数量短语，不是 a + lot + of 的词根派生。", [["lots of", "许多"], ["the number of", "……的数量"]], []);
explainWord("the number of", "phrase", [], "the number of 表示……的数量，主语中心是单数 number，后面常接单数谓语。注意 a number of 表示许多，含义和语法都不同。", [["number", "数量"], ["a number of", "许多"]], []);
explainWord("look like", "phrase", [], "look like 表示看起来像，look 是看起来，like 是像这个介词。这里 like 不是喜欢的动词。", [["look", "看；看起来"], ["like", "像"]], []);
explainWord("family store", "phrase", [], "family 表示家庭，store 表示商店，family store 按上下文可理解为家庭商店或家族经营的商店。是两个词的组合，不把 family 的 -ly 当作副词后缀。", [["family", "家庭"], ["store", "商店"]], []);
explainWord("be called", "phrase", [], "be called 是 be 加 call 的过去分词 called，表示被叫作、名叫。-ed 是规则过去分词词尾，be 随主语和时态变化。", [["call", "称呼"], ["called", "被称为"]], []);
explainWord("be made of", "phrase", [], "be made of 表示由……制成，made 是 make 的不规则过去分词。通常用于仍能辨认原材料的情况；这里 of 是搭配的一部分。", [["make", "制作"], ["made", "制作（过去分词）"]], []);
explainWord("in fact", "phrase", [], "in fact 表示事实上，fact 是事实。fact 的词源与拉丁语 facere（做）有关，“做过的事情”发展出事实义；这组短语整体作补充说明。", [["fact", "事实"], ["factual", "事实的"]], []);
explainWord("get married with", "phrase", [], "表达与某人结婚时，标准学习用法通常是 get married to someone 或 marry someone；原词表中的 with 不适合作这个通用搭配。married 来自 marry，把 y 改 i 加 -ed。", [["get married to", "与……结婚"], ["marry", "结婚"]], []);
explainWord("after school", "phrase", [], "after 表示在……之后，school 是学校，after school 表示放学后。这里 school 指上学活动，常不加 the。", [["school", "学校"], ["after-school", "课后的"]], []);
explainWord("elementary school", "phrase", [], "elementary 可联系 element（基础成分）与形容词词尾 -ary，表示基础的；elementary school 是小学。词中的 t 属于 element，不是另一个词根。", [["element", "基础成分"], ["elementary", "基础的"]], []);
explainWord("high school", "phrase", [], "high 表示高的，school 表示学校；high school 是学校阶段名称，通常指高中，具体年级随教育体系而异。不能只按字面理解为很高的校舍。", [["high", "高的"], ["school", "学校"]], []);
explainWord("point to", "phrase", [], "point to 表示指向，point 是指、指向，to 表示方向。point 也可作名词“点”，这里按动词短语记忆。", [["point", "指向"], ["pointer", "指示物"]], []);
explainWord("between A and B", "phrase", [], "between A and B 表示在 A 和 B 之间。A、B 是可替换的对象，and 用于连接两者；整组属于介词结构，不是一个可拆词根的单词。", [["between", "在……之间"], ["both A and B", "A 和 B 两者都"]], []);
explainWord("make a fire", "phrase", [], "make a fire 表示生火，make 是制作、使产生，fire 是火。这里 a fire 指一次点起的火，而不是给 make 添加词缀。", [["make", "制作"], ["fire", "火"]], []);
explainWord("play the piano", "phrase", [], "play the piano 表示弹钢琴，play 在这里是演奏。英语学习中乐器名前常用 the，不要漏掉它；这不是词根派生。", [["play", "演奏"], ["piano", "钢琴"]], []);
explainWord("pop-up", "phrase", [], "pop up 是突然出现、冒出的动词短语；带连字符的 pop-up 可作修饰语，表示临时出现的，也可指弹出窗口。快闪店用的是临时出现这一含义。", [["pop up", "突然出现"], ["pop-up store", "快闪店"]], []);
explainWord("a few", "phrase", [], "a few 表示有一些，后面接可数名词复数，如 a few books。few 不带 a 时往往强调几乎没有，不能忽略 a 的作用。", [["few", "很少的"], ["a little", "一点儿"]], []);
explainWord("a little", "phrase", [], "a little 表示有一点，常修饰不可数名词，如 a little water。little 不带 a 时往往强调几乎没有；与 a few 区分可数、不可数。", [["little", "少量的"], ["a few", "一些"]], []);
explainWord("TV program", "phrase", [], "TV 是 television 的缩写；tele- 表示远，vision 与看、视觉有关。program 是节目，TV program 就是电视节目；这里的 TV 不是一个独立词根。", [["television", "电视"], ["program", "节目"]], []);
explainWord("pay for", "phrase", [], "pay for 表示为……付款，pay 是支付，for 引出购买的东西或支付的对象。payment 中的 -ment 构成名词，for 本身不是后缀。", [["pay", "支付"], ["payment", "付款"]], []);
explainWord("instead of", "phrase", [], "instead of 表示代替、而不是，of 后可接名词或动名词。instead 历史上来自 in stead（在……的位置），stead 表示位置。", [["instead", "代替"], ["stead", "位置（旧用法）"]], []);
explainWord("pop-up store", "phrase", [], "pop-up 表示临时出现的，store 是商店，合起来是限时开设的快闪店。连字符把 pop 和 up 连成修饰语；不是给 store 加英语前缀。", [["pop up", "突然出现"], ["store", "商店"]], []);
explainWord("communicate", "root", [["communic", "共享；传达", "root"], ["ate", "构成动词", "suf"]], "communic- 来自拉丁语 communicare（共享、传达），与 communis（共同的）相关；-ate 是动词词尾。把信息与别人共享，就有了“交流、沟通”的意思。不要把它拆成几个碰巧相似的英语小词。", [["communication", "交流；沟通"], ["community", "社区"], ["common", "共同的"]], ["https://www.etymonline.com/word/communicate"]);
explainWord("communication", "root", [["communicat", "传达（communicate 的词干）", "root"], ["ion", "行为或过程", "suf"]], "与 communicate 同源，核心是“共享信息”。拼写上可记 communicate 去掉 e 加 -ion，动词“交流”变成名词“交流、沟通”；也可比较 -ate → -ation 这一词尾变化。", [["communicate", "交流"], ["communicative", "健谈的；乐于交流的"]], ["https://www.etymonline.com/word/communication"]);
explainWord("geography", "root", [["geo", "地球；土地", "root"], ["graphy", "描写；记录", "suf"]], "geo- 表示地球，-graphy 源自“描写、记录”。geography 原义是对地球表面的描述，现在指地理学。", [["geology", "地质学"], ["geographer", "地理学家"]], ["https://www.etymonline.com/word/geography"]);
explainWord("describe", "root", [["de", "向下；记下", "pre"], ["scribe", "写", "root"]], "de- 在这里表示“向下”，scrib-/scribe 表示“写”。拉丁语原义是写下来、描绘，后来也包括口头描述。不是把 de- 一律理解为否定。", [["description", "描述"], ["scribe", "抄写员"]], ["https://www.etymonline.com/word/describe"]);
explainWord("inference", "root", [["in", "进入", "pre"], ["fer", "带；拿", "root"], ["ence", "行为或结果", "suf"]], "infer 源于 in-（进入）和 fer（带来），引申为通过推理得出结论；-ence 构成名词。inference 是推断这一过程或推断出的结果。", [["infer", "推断"], ["reference", "参考；提及"]], ["https://www.etymonline.com/word/inference"]);
explainWord("explain", "root", [["ex", "向外", "pre"], ["plain", "平；清楚（源自 planus）", "root"]], "源自拉丁语 ex-（向外）和 planus（平的），原来有展开、弄平的含义，再引申为把事情说明白。这里的 plain 与“清楚、明白”相关。", [["explanation", "解释"], ["plain", "清楚的；平的"]], ["https://www.etymonline.com/word/explain"]);
explainWord("educate", "root", [["e", "向外（ex- 的变体）", "pre"], ["duc", "引导", "root"], ["ate", "构成动词", "suf"]], "源自拉丁语 educare（养育、培养），与 educere（引导出来）相关，可以识别 duc（引导）这一词根。但“把潜能引出来”只是教学联想，不能当作这个词确定的原始含义。", [["education", "教育"], ["educator", "教育工作者"]], ["https://www.etymonline.com/word/educate"]);
explainWord("dinosaur", "root", [["dino", "可怕的；令人敬畏的", "root"], ["saur", "蜥蜴", "root"]], "来自希腊语 deinos 和 sauros，字面是“可怕的蜥蜴”，是恐龙名称的历史构成；名称不表示恐龙在现代分类上就是蜥蜴。", [["dinosaurian", "恐龙的"], ["pterosaur", "翼龙"]], ["https://www.etymonline.com/word/dinosaur"]);
explainWord("special", "root", [["speci", "种类；样貌（来自 species）", "root"], ["al", "与……有关的", "suf"]], "来自拉丁语 specialis，与 species（种类、样貌）相关。由“特定的、某一类的”发展为“特别的”。这里先记 speci-，不要把它直接翻译成“看”。", [["specialist", "专家"], ["specially", "专门地"]], ["https://www.etymonline.com/word/special"]);
explainWord("local", "root", [["loc", "地方", "root"], ["al", "与……有关的", "suf"]], "loc 来自拉丁语 locus（地方），-al 表示与某事物有关；local 就是当地的、本地的。", [["location", "位置"], ["locate", "定位"]], ["https://www.etymonline.com/word/local"]);
explainWord("popular", "root", [["popul", "人民；大众", "root"], ["ar", "与……有关的", "suf"]], "popul 来自拉丁语 populus（人民），-ar 构成形容词。由“属于大众的”发展为“受大众欢迎的”。", [["population", "人口"], ["popularity", "受欢迎程度"]], ["https://www.etymonline.com/word/popular"]);
explainWord("important", "root", [["im", "进入（in- 的变体）", "pre"], ["port", "携带", "root"], ["ant", "形容词词尾", "suf"]], "词源中的 port 表示携带，im- 表示进入；古义“带进来”发展出“带有分量、有影响”的意思，再成为“重要的”。这是一条意义演变，不能把 important 直译成进口的。", [["importance", "重要性"], ["import", "进口；意义"]], ["https://www.etymonline.com/word/important"]);
explainWord("distance", "origin", [], "源于拉丁语 distare（分开站着）：dis- 表示分开，sta-/stare 表示站立。“分开站着”引出距离这一含义。英语可将 distant（遥远的）与 distance（距离）成组记，不能把 nce 独立当作后缀。", [["distant", "遥远的"]], ["https://www.etymonline.com/word/distance"]);
explainWord("vacation", "root", [["vac", "空；闲", "root"], ["ation", "状态或过程", "suf"]], "vac 来自拉丁语 vacare（空着、闲着），-ation 构成名词。从日常工作或义务中空出时间，就有了休假、假期的意思。", [["vacant", "空着的"], ["vacate", "腾出"]], ["https://www.etymonline.com/word/vacation"]);
explainWord("animal", "root", [["anim", "呼吸；生命", "root"], ["al", "与……有关的", "suf"]], "anim 来自拉丁语 anima（呼吸、生命），animal 原来指有生命、会呼吸的生物。现代常用来指动物。", [["animate", "使有生气"], ["animation", "动画；活力"]], ["https://www.etymonline.com/word/animal"]);
explainWord("science", "root", [["sci", "知道", "root"], ["ence", "状态；名词词尾", "suf"]], "来自拉丁语 scientia（知识），其基础 scire 表示知道。sci- 与“知”有关；从知识发展为经过系统研究获得的科学知识。", [["scientist", "科学家"], ["scientific", "科学的"]], ["https://www.etymonline.com/word/science"]);
explainWord("business", "affix", [["busi", "忙碌（busy 的历史拼写变化）", "word"], ["ness", "状态；名词词尾", "suf"]], "历史上由 busy 和 -ness 构成，意义从忙于事务发展为业务、生意。现代 business 通常读两个音节；今天单纯表示“忙碌状态”常写 busyness。", [["busy", "忙碌的"], ["businessman", "商人"]], ["https://www.etymonline.com/word/business"]);
explainWord("similarity", "affix", [["similar", "相似的", "word"], ["ity", "性质；状态", "suf"]], "similar（相似的）加 -ity，形容词变为名词，表示相似性；复数 similarities 常指多个相似点。similar 本身与拉丁语 similis（相像的）相关。", [["similar", "相似的"], ["similarly", "相似地"]], ["https://www.etymonline.com/word/similarity"]);
explainWord("expensive", "affix", [["expens", "费用（expense 去掉 e）", "word"], ["ive", "具有……性质的", "suf"]], "expense 是费用、开支，去掉 e 加 -ive，表示花费多的、昂贵的。更深的词源与拉丁语 expendere（支付）有关，其中 ex- 是向外，pend 是称量、支付。", [["expense", "费用"], ["expend", "花费"]], ["https://www.etymonline.com/word/expensive"]);
explainWord("enjoy", "affix", [["en", "使；构成动词", "pre"], ["joy", "快乐", "word"]], "en- 与 joy（快乐）相关，历史上有使快乐、感到快乐的意思，现在表示享受、喜欢。常用 enjoy doing something。", [["joy", "快乐"], ["enjoyment", "享受；乐趣"]], ["https://www.etymonline.com/word/enjoy"]);
explainWord("research", "affix", [["re", "加强语气（历史解释）", "pre"], ["search", "寻找", "word"]], "由法语表示仔细寻找的词发展而来；re- 在这里可能加强语气，不宜固定解释成“再一次”。核心是仔细探究，所以 research 表示研究。", [["search", "搜寻"], ["researcher", "研究人员"]], ["https://www.etymonline.com/word/research"]);
explainWord("especially", "affix", [["especial", "特别的", "word"], ["ly", "构成副词", "suf"]], "especial 加 -ly，表示尤其、特别。especial 与 special 相关；开头的 e 不是可以单独翻译的英语前缀。", [["especial", "特别的"], ["special", "特别的"]], ["https://dictionary.cambridge.org/dictionary/english/especially"]);
explainWord("famous", "affix", [["fam", "名声（fame 去掉 e）", "word"], ["ous", "具有……的", "suf"]], "fame 是名声，去掉 e 加 -ous，形成 famous，意思是有名的。注意 fam 不是 family 的缩写。", [["fame", "名声"], ["famously", "出名地"]], ["https://dictionary.cambridge.org/grammar/british-grammar/word-formation_2"]);
explainWord("Japanese", "affix", [["Japan", "日本", "word"], ["ese", "某地的；某地人或语言", "suf"]], "Japan 加 -ese，表示日本的、日本人或日语。国家名及其派生词都要大写首字母。", [["Japan", "日本"]], ["https://dictionary.cambridge.org/grammar/british-grammar/word-formation_2"]);
explainWord("grandparent", "affix", [["grand", "亲属关系中隔一代", "pre"], ["parent", "父亲或母亲", "word"]], "亲属名称中的 grand- 表示隔一代，grandparent 是祖父母或外祖父母中的一位，复数 grandparents 可统称祖辈。", [["grandmother", "祖母；外祖母"], ["grandfather", "祖父；外祖父"]], ["https://dictionary.cambridge.org/grammar/british-grammar/word-formation_2"]);
explainWord("movie", "origin", [], "movie 是 moving picture（活动影像、电影）的非正式缩短形式，后来成为常用词。它与 move（移动）有联系，不要把 -ie 硬译成一种职业。", [["move", "移动"], ["moving picture", "电影"]], ["https://www.etymonline.com/word/movie"]);
explainWord("landscape", "origin", [["land", "土地", "word"], ["scape", "景观；源自荷兰语词尾", "suf"]], "借自荷兰语 landschap，原来指地区，后来用于风景画。英语中的 -scape 也见于 seascape、cityscape，表示某种景观；不要把它解释成 escape 的截断。", [["seascape", "海景"], ["cityscape", "城市景观"]], ["https://www.etymonline.com/word/landscape"]);
explainWord("pineapple", "compound", [["pine", "松树", "word"], ["apple", "苹果；历史上也泛指果实", "word"]], "pine + apple 原先指松果，后来因外形相似用于菠萝。菠萝不长在松树上，也不是苹果的一种；这是名称的历史比喻。", [["pine", "松树"], ["apple", "苹果"]], ["https://www.etymonline.com/word/pineapple"]);
explainWord("kindergarten", "origin", [["kinder", "儿童（德语复数）", "root"], ["garten", "花园（德语）", "root"]], "这是德语借词，Kinder 表示儿童，Garten 表示花园，字面是“儿童的花园”，用来比喻幼儿成长的地方。kinder 不是英语 kind 的比较级。", [["kindergartner", "幼儿园儿童"]], ["https://www.etymonline.com/word/kindergarten"]);
explainWord("below", "origin", [["be", "在……附近；位置前缀", "pre"], ["low", "低的", "word"]], "历史上由 be- 与 low（低）形成，意思是在较低的位置。这里 be- 是旧的位置前缀，不是动词 be。", [["low", "低的"], ["belowground", "地下的"]], ["https://www.etymonline.com/word/below"]);
explainWord("alone", "origin", [["al", "全部（历史上的 all）", "word"], ["one", "一个", "word"]], "源自 all one 的历史形式，意思是完全独自一人，后来缩成 alone。它描述独自的状态；lonely 更强调孤独的感觉。", [["lonely", "孤独的"], ["aloneness", "独自一人的状态"]], ["https://www.etymonline.com/word/alone"]);
explainWord("instead", "origin", [["in", "在……中", "word"], ["stead", "位置（旧义）", "word"]], "由旧短语 in stead 合成，stead 表示位置，合起来是占据另一事物的位置，因此表示代替。stead 还保留在 in someone's stead 中。", [["instead of", "代替；而不是"], ["stead", "位置（旧用法）"]], ["https://www.etymonline.com/word/instead"]);
explainWord("only", "origin", [["on", "一（one 的历史形式）", "root"], ["ly", "像……的（历史词尾）", "suf"]], "历史上来自 one 加表示“像……的”的旧词尾，原义是唯一的；后来也作副词“仅仅”。这里不是 on（在上面）加一般副词 -ly。", [["one", "一个"], ["only child", "独生子女"]], ["https://www.etymonline.com/word/only"]);
explainWord("always", "origin", [["al", "全部（历史上的 all）", "word"], ["way", "路；历程", "word"], ["s", "旧副词词尾", "suf"]], "源于表示 all the way 的古英语短语，很早就用来表示所有时间、一直。结尾 s 是历史副词词尾，不是现代名词复数，因此 always 表示总是。", [["all", "全部"], ["way", "路；方式"]], ["https://www.etymonline.com/word/always"]);
explainWord("Monday", "origin", [["Mon", "月亮（moon 的历史形式）", "root"], ["day", "天", "word"]], "历史名称是“月亮之日”，Mon- 与 moon 相关。今天整体表示星期一；星期名称首字母大写。", [["moon", "月亮"], ["day", "天"]], ["https://www.etymonline.com/word/Monday"]);
explainWord("Tuesday", "origin", [["Tues", "神名 Tiw 的历史所有格形式", "root"], ["day", "天", "word"]], "源于日耳曼神话中的 Tiw 之日。Tues- 来自神名的历史形式，不是 two 的词根；今天表示星期二。", [["day", "天"]], ["https://www.etymonline.com/word/Tuesday"]);
explainWord("Wednesday", "origin", [["Wednes", "神名 Woden 的历史所有格形式", "root"], ["day", "天", "word"]], "原意是 Woden 之日，Woden 与北欧神话的 Odin 对应。拼写保留历史形式，发音发生了缩短；今天表示星期三。", [["day", "天"]], ["https://www.etymonline.com/word/Wednesday"]);
explainWord("Thursday", "origin", [["Thurs", "雷神 Thor 的历史名称形式", "root"], ["day", "天", "word"]], "原意是雷神之日，Thurs- 与 Thor、thunder 的历史形式相关。今天整体表示星期四。", [["thunder", "雷"], ["day", "天"]], ["https://www.etymonline.com/word/Thursday"]);
explainWord("Friday", "origin", [["Fri", "女神 Frigg 的历史名称形式", "root"], ["day", "天", "word"]], "历史上是女神 Frigg 之日，今天表示星期五。Fri- 不表示 free（自由），不要用现代字母相似性解释词源。", [["day", "天"]], ["https://www.etymonline.com/word/Friday"]);
explainWord("Saturday", "origin", [["Satur", "Saturn（土星）的历史名称形式", "root"], ["day", "天", "word"]], "历史名称是土星之日，Satur- 来自 Saturn；今天整体表示星期六。", [["Saturn", "土星"], ["day", "天"]], ["https://www.etymonline.com/word/Saturday"]);
explainWord("Sunday", "origin", [["Sun", "太阳", "word"], ["day", "天", "word"]], "历史原义是太阳之日，由 sun 与 day 对应的旧形式组成；今天表示星期日。", [["sun", "太阳"], ["day", "天"]], ["https://www.etymonline.com/word/Sunday"]);
explainWord("city", "origin", [], "city 经法语来自拉丁语 civitas（公民共同体），与 civis（公民）相关。词形已经变化，不按 ci + ty 拆；可联想同源词 civil 中的 civ-（公民）。复数 city → cities。", [["civil", "公民的"], ["citizen", "公民"]], ["https://www.etymonline.com/word/city"]);
explainWord("tour", "origin", [], "tour 的历史含义与转一圈、巡行相关，后来表示到各处游览。现代英语中 tour 本身可作词基，加 -ist 得 tourist，加 -ism 得 tourism。", [["tourist", "游客"], ["tourism", "旅游业"]], ["https://www.etymonline.com/word/tour"]);
explainWord("model", "origin", [], "源头是拉丁语 modulus（小尺度、标准），后来表示按比例做出的模型。现代 model 可整体作名词或动词，不把它拆成 mode + l。", [["modeling", "建模（美式）"], ["remodel", "改建"]], ["https://www.etymonline.com/word/model"]);
explainWord("meter", "root", [["meter", "测量；米", "root"]], "长度单位 meter 源于希腊语 metron（度量）；metr-/meter 与测量有关，也用于测量仪器名称。米的英式拼写是 metre。", [["kilometer", "千米"], ["thermometer", "温度计"]], ["https://www.etymonline.com/word/meter"]);
explainWord("window", "origin", [], "源自古诺尔斯语中“风”和“眼”的组合，字面是风之眼，指通风透光的开口。现代拼写里的 -ow 不是“眼”的英语词根，因此不作 wind + ow 的伪拆解。", [["windowpane", "窗玻璃"], ["windowless", "无窗的"]], ["https://www.etymonline.com/word/window"]);
explainWord("history", "origin", [], "经拉丁语来自希腊语 historia，原来与调查、由调查得到的知识有关，后来表示过去事件的记录。hist-/histor- 可在 historical、historian 中识别；history 不是 his + story。", [["historian", "历史学家"], ["historical", "历史的"]], ["https://www.etymonline.com/word/history"]);
explainWord("understand", "origin", [], "这是古英语留下的组合词，但 under 在这里的确切历史含义存在不同解释，可能与“在……之间”有关。不能直译为站在下面；现代先把 understand（理解）整体作为词基。", [["understanding", "理解"], ["misunderstand", "误解"]], ["https://www.etymonline.com/word/understand"]);
explainWord("tradition", "origin", [], "来自拉丁语 tradere（交付、传下去）一系，历史上与 trans-（越过、传递）和 dare（给）相关。“代代传递”引出传统；现代可用 tradition + -al 记 traditional。", [["traditional", "传统的"], ["traditionally", "传统上"]], ["https://www.etymonline.com/word/tradition"]);
explainWord("continue", "origin", [], "源自拉丁语中“连接、不间断”的词，进一步与 con-（一起）和 tenere（保持）有关。意思是持续、继续；现代拼写不适合硬拆为 con + tin + ue。", [["continuous", "连续的"], ["continuation", "继续"]], ["https://www.etymonline.com/word/continue"]);
explainWord("human", "origin", [], "来自拉丁语 humanus（人的）。现代 human 整体作词基，可组成 humanity（人类；人性）、inhuman（不人道的）；不要拆成 hu + man 来解释词源。", [["humanity", "人类；人性"], ["inhuman", "不人道的"]], ["https://www.etymonline.com/word/human"]);
explainWord("create", "origin", [], "来自拉丁语 creare（创造、产生），cre-/creat- 可帮助串起 create、creation、creative。现代记 create 去掉 e 后接 -ive 或 -ion，注意词尾变化。", [["creation", "创造；作品"], ["creative", "有创造力的"]], ["https://www.etymonline.com/word/create"]);
explainWord("real", "origin", [], "源自拉丁语 res（事物）一系，原来与实际存在的事物有关，成为“真实的”。现代 real 是完整词基，不把 re- 当成“再一次”。", [["really", "真正地"], ["reality", "现实"]], ["https://www.etymonline.com/word/real"]);
explainWord("vegetable", "origin", [], "源头与拉丁语 vegetare（使有生气、生长）有关，veget- 可在 vegetation 中识别。早期与能生长的植物有关，后来指蔬菜；不是 vege + table（桌子）。", [["vegetation", "植被"], ["vegetarian", "素食者"]], ["https://www.etymonline.com/word/vegetable"]);
explainWord("finish", "origin", [], "来自法语并可追溯到拉丁语 finis（边界、终点），fin- 与结束有关，可联想 final。现代 finish 整体记，不把 -ish 当成“大约、有点”的后缀。", [["final", "最后的"], ["finished", "完成的"]], ["https://www.etymonline.com/word/finish"]);
explainWord("visit", "origin", [], "源自拉丁语“去看、探望”的词，其 vis-/vid- 与看有关，也见于 vision、visible。现代 visit 整体作词基，visitor 是来访者。", [["visitor", "来访者"], ["visible", "可见的"]], ["https://www.etymonline.com/word/visit"]);
explainWord("difficult", "origin", [], "与 difficulty 同源，拉丁语源头结合 dis-（不）与 facilis（容易做的），后者与 facere（做）相关。经历了词形变化，不要把现代 difficult 的 cult 解作文化。", [["difficulty", "困难"], ["facilitate", "使便利"]], ["https://www.etymonline.com/word/difficult"]);
explainWord("favorite", "origin", [], "与 favor（偏爱、支持）同源，经法语等形式进入英语，表示最喜欢的人或事物，也可作形容词。词尾 -ite 在这里不能直接套用表示矿物或居民的规则。英式常写 favourite。", [["favor", "偏爱"], ["favoritism", "偏袒"]], ["https://www.etymonline.com/word/favorite"]);
explainWord("restaurant", "origin", [], "来自法语中表示恢复精力的词，先与恢复体力的食物有关，后来指餐馆。它与 restore 同源，不是 rest + aura + ant，更不是“休息的蚂蚁”。", [["restore", "恢复"], ["restaurateur", "餐馆经营者"]], ["https://www.etymonline.com/word/restaurant"]);
explainWord("customer", "affix", [["custom", "惠顾；习惯", "word"], ["er", "表示人", "suf"]], "可用 custom（习惯、经常惠顾）与表示人的 -er 联想顾客。历史上经历了法语、拉丁语形式，并非简单在现代英语里新造出的词。不是 costume（服装）加 r。", [["custom", "习惯；惠顾"], ["customary", "习惯的"]], ["https://www.etymonline.com/word/customer"]);
explainWord("salad", "origin", [], "来自拉丁语 sal（盐）一系，早期指加盐调味的蔬菜，后来成为沙拉的名称。可用 sal- 串起 saline（含盐的），但现代 salad 不拆成 sal + ad 两个英语词。", [["saline", "含盐的"], ["salt", "盐"]], ["https://www.etymonline.com/word/salad"]);
explainWord("village", "origin", [], "经法语来自与拉丁语 villa（乡间住宅、农庄）相关的词，发展为村庄。vill- 可帮助联系 villa、village、villager；现代 village 加 -er 就是村民。", [["villa", "乡间别墅"], ["villager", "村民"]], ["https://www.etymonline.com/word/village"]);
explainWord("college", "origin", [], "源自拉丁语 collegium（团体、社团），更深处有 col-（com- 的变体，一起）与 leg-（选择、集合）的关系。后来用于共同学习的机构；不要把 leg 解作腿。", [["colleague", "同事"], ["collegiate", "学院的"]], ["https://www.etymonline.com/word/college"]);
explainWord("hotel", "origin", [], "来自法语 hôtel，与 hostel、hospital 同源，可追溯到 hosp-（客人、接待）这一词源关系。历史上与住所、接待处相关，后来成为旅馆；不能拆成 hot + el。", [["hostel", "旅舍"], ["hospitality", "好客；接待"]], ["https://www.etymonline.com/word/hotel"]);
explainWord("country", "origin", [], "经法语来自表示“展现在面前的土地”的历史形式，与拉丁语 contra（对面）相关。词形变化较大，现代整体作为国家、乡村的词基，不是 count + ry。", [["countryside", "乡村"], ["countrywide", "全国范围的"]], ["https://www.etymonline.com/word/country"]);
explainWord("minute", "origin", [], "来自拉丁语表示小部分的词，与 minuere（缩小）相关；min-/minut- 可联系微小的意思。小时细分出的一小份成为分钟，minute 作形容词“微小的”时发音不同。", [["minutely", "详细地"], ["minuteness", "微小"]], ["https://www.etymonline.com/word/minute"]);
explainWord("second", "origin", [], "“第二”源于拉丁语 secundus（接着的、随后），与跟随有关。“秒”来自把时间第二次细分的名称：先把小时分成分，再把分细分成秒。", [["secondary", "第二的；次要的"], ["secondly", "其次"]], ["https://www.etymonline.com/word/second"]);
explainWord("Singapore", "origin", [], "新加坡的地名通常追溯到表示“狮城”的梵语成分，simha 是狮子，pura 是城市；这解释名称，不表示当地历史上一定有狮子。不是英语 sing + pore。", [["Singaporean", "新加坡的；新加坡人"]], ["https://www.etymonline.com/word/Singapore"]);
explainWord("island", "origin", [], "来自古英语中表示岛的成分与 land（土地）的组合。s 是后来受 isle 的拼写影响加入的，但两个词并非同源，所以 s 不发音；不是 is + land。", [["islander", "岛民"], ["land", "土地"]], ["https://www.etymonline.com/word/island"]);
explainWord("strange", "origin", [], "经法语来自拉丁语 extraneus（外来的），与 extra（外面）相关。由外来的发展为陌生的、奇怪的，词形变化后不再直接显示 extra-。", [["stranger", "陌生人"], ["strangely", "奇怪地"]], ["https://www.etymonline.com/word/strange"]);
explainWord("fruit", "origin", [], "来自拉丁语 fructus（果实、产出、收获），fruct- 可见于 fructose（果糖）。现代 fruit 整体作词基，fruitful 加 -ful 可比喻成果丰硕。", [["fructose", "果糖"], ["fruitful", "成果丰硕的"]], ["https://www.etymonline.com/word/fruit"]);
explainWord("art", "root", [["art", "技艺；艺术", "root"]], "源于拉丁语 ars、art-（技艺、技能），后来发展出艺术义。art 本身也可作现代词基：artist 加 -ist 表示艺术家，artistic 表示艺术的。", [["artist", "艺术家"], ["artistic", "艺术的"]], ["https://www.etymonline.com/word/art"]);

// 短语中引用的词根，记录到具体词条来源。
Object.entries({
  'take photos': 'photograph', 'different from': 'different', 'in fact': 'fact',
  'elementary school': 'elementary', 'tv program': 'television', 'instead of': 'instead',
  'common': 'common'
}).forEach(([word, source]) => { WORD_FORMATION[word].formationSources = ['https://www.etymonline.com/word/' + source]; });
WORD_FORMATION.pe.formationKind = 'phrase';
WORD_FORMATION.math.formationKind = 'phrase';

UNITS.forEach(unit => unit.words.forEach(word => {
  const entry = WORD_FORMATION[word.w.toLowerCase()];
  if (entry) Object.assign(word, entry);
}));

/* 学习卡补充内容：美式音标 + 简短、适龄的英文例句。 */
const WORD_CARD_CONTENT = {
  'city':['/ˈsɪti/','Shanghai is a big city.'], 'tourist':['/ˈtʊrɪst/','The tourist takes many photos.'],
  'tour':['/tʊr/','We went on a city tour.'], 'clock':['/klɑːk/','The clock shows nine o’clock.'],
  'bell':['/bel/','The school bell is ringing.'], 'model':['/ˈmɑːdəl/','He made a model airplane.'],
  'show':['/ʃoʊ/','We watched a funny show.'], 'special':['/ˈspeʃəl/','Today is a special day.'],
  'amazing':['/əˈmeɪzɪŋ/','The view is amazing.'], 'ring':['/rɪŋ/','The bell will ring at noon.'],
  'monday':['/ˈmʌndeɪ/','We go to school on Monday.'], 'tuesday':['/ˈtuːzdeɪ/','I have music class on Tuesday.'],
  'wednesday':['/ˈwenzdeɪ/','We play basketball on Wednesday.'], 'thursday':['/ˈθɝːzdeɪ/','The library opens on Thursday.'],
  'friday':['/ˈfraɪdeɪ/','Friday is my favorite school day.'], 'saturday':['/ˈsætərdeɪ/','We visit Grandma on Saturday.'],
  'sunday':['/ˈsʌndeɪ/','Our family rests on Sunday.'], 'weekday':['/ˈwiːkdeɪ/','I get up early on a weekday.'],
  'weekend':['/ˈwiːkend/','We often go hiking at the weekend.'], 'tiny':['/ˈtaɪni/','A tiny ant is on the leaf.'],
  'cushion':['/ˈkʊʃən/','The cushion is soft.'], 'pillow':['/ˈpɪloʊ/','I put my head on the pillow.'],
  'couch':['/kaʊtʃ/','The cat is sleeping on the couch.'], 'living room':['/ˈlɪvɪŋ ruːm/','We watch TV in the living room.'],
  'stove':['/stoʊv/','The soup is cooking on the stove.'], 'window':['/ˈwɪndoʊ/','Please open the window.'],
  'stair':['/ster/','Be careful on the stair.'], 'computer':['/kəmˈpjuːtər/','I use the computer for homework.'],
  'meter':['/ˈmiːtər/','The table is one meter long.'], 'easy':['/ˈiːzi/','This question is easy.'],
  'ear':['/ɪr/','A rabbit has long ears.'], 'leg':['/leɡ/','He hurt his leg.'], 'hair':['/her/','She has long black hair.'],
  'foot':['/fʊt/','My left foot is wet.'], 'mouth':['/maʊθ/','Open your mouth and say ah.'], 'eye':['/aɪ/','Something is in my eye.'],
  'arm':['/ɑːrm/','Raise your right arm.'], 'hand':['/hænd/','Please wash your hands.'], 'head':['/hed/','The hat is on his head.'],
  'nose':['/noʊz/','The dog has a wet nose.'], 'strange':['/streɪndʒ/','I heard a strange sound.'],
  'fruit':['/fruːt/','Fruit is a healthy snack.'], 'rock':['/rɑːk/','The boy picked up a small rock.'],
  'seashell':['/ˈsiːʃel/','She found a seashell on the beach.'], 'glass':['/ɡlæs/','The window is made of glass.'],
  'bottle':['/ˈbɑːtəl/','Fill the bottle with water.'], 'airplane':['/ˈerpleɪn/','The airplane is flying above us.'],
  'dinosaur':['/ˈdaɪnəsɔːr/','This dinosaur has a long neck.'], 'upside-down':['/ˌʌpsaɪd ˈdaʊn/','The picture is upside-down.'],
  'travel':['/ˈtrævəl/','We love to travel by train.'], 'traveller':['/ˈtrævələr/','The traveller carried a small bag.'],
  'interesting':['/ˈɪntrəstɪŋ/','This book is very interesting.'], 'interested':['/ˈɪntrəstɪd/','I am interested in science.'],
  'love':['/lʌv/','I love my family.'], 'watch':['/wɑːtʃ/','We watch a movie together.'],
  'difficult':['/ˈdɪfɪkəlt/','The last question is difficult.'], 'favorite':['/ˈfeɪvərɪt/','Blue is my favorite color.'],
  'country':['/ˈkʌntri/','China is a beautiful country.'], 'giraffe':['/dʒəˈræf/','The giraffe has a long neck.'],
  'beautiful':['/ˈbjuːtəfəl/','The garden is beautiful.'], 'red':['/red/','The apple is red.'],
  'color':['/ˈkʌlər/','What color is your bag?'], 'singer':['/ˈsɪŋər/','The singer has a lovely voice.'],
  'movie':['/ˈmuːvi/','We saw a funny movie.'], 'sport':['/spɔːrt/','Swimming is my favorite sport.'],
  'yellow':['/ˈjeloʊ/','The sunflowers are yellow.'], 'white':['/waɪt/','Snow is white.'],
  'purple':['/ˈpɝːpəl/','She wears a purple dress.'], 'green':['/ɡriːn/','The leaves are green.'], 'black':['/blæk/','The cat is black.'],
  'take photos':['/teɪk ˈfoʊtoʊz/','We take photos on vacation.'], 'the same as':['/ðə seɪm æz/','My bag is the same as yours.'],
  'different from':['/ˈdɪfrənt frəm/','A dolphin is different from a fish.'], 'island':['/ˈaɪlənd/','They live on a small island.'],
  'boat':['/boʊt/','We crossed the lake by boat.'], 'restaurant':['/ˈrestərɑːnt/','We ate dinner at a restaurant.'],
  'town':['/taʊn/','It is a quiet little town.'], 'hotel':['/hoʊˈtel/','We stayed at a hotel near the beach.'],
  'underground':['/ˌʌndərˈɡraʊnd/','The train runs underground.'], 'hour':['/ˈaʊər/','The trip takes one hour.'],
  'minute':['/ˈmɪnɪt/','Please wait a minute.'], 'second':['/ˈsekənd/','I finished one second later.'],
  'everything':['/ˈevriθɪŋ/','Everything is ready.'], 'visit':['/ˈvɪzɪt/','We will visit the museum.'],
  'live':['/lɪv/','I live near my school.'], 'store':['/stɔːr/','She bought milk at the store.'],
  'underwater':['/ˌʌndərˈwɔːtər/','We saw an underwater cave.'], 'unusual':['/ʌnˈjuːʒuəl/','That is an unusual animal.'],
  'beach':['/biːtʃ/','The children played on the beach.'], 'famous':['/ˈfeɪməs/','The town is famous for its food.'],
  'stay':['/steɪ/','We will stay here tonight.'], 'a lot of':['/ə lɑːt əv/','There are a lot of books here.'],
  'the number of':['/ðə ˈnʌmbər əv/','The number of students is growing.'], 'same':['/seɪm/','We are in the same class.'],
  'seaweed':['/ˈsiːwiːd/','Seaweed grows in the sea.'], 'hide':['/haɪd/','The rabbit can hide in the grass.'],
  'body':['/ˈbɑːdi/','Exercise keeps your body strong.'], 'leaf':['/liːf/','A green leaf fell from the tree.'],
  'branch':['/bræntʃ/','A bird sits on the branch.'], 'trunk':['/trʌŋk/','The tree has a thick trunk.'],
  'stranger':['/ˈstreɪndʒər/','Do not follow a stranger.'], 'animal':['/ˈænɪməl/','The panda is a gentle animal.'],
  'mean':['/miːn/','What does this word mean?'], 'shape':['/ʃeɪp/','The table is round in shape.'],
  'owl':['/aʊl/','An owl can see at night.'], 'left':['/left/','Turn left at the corner.'], 'right':['/raɪt/','Raise your right hand.'],
  'middle':['/ˈmɪdəl/','The ball is in the middle.'], 'odd':['/ɑːd/','That is an odd number.'], 'eat':['/iːt/','We eat lunch at noon.'],
  'sleep':['/sliːp/','Children need to sleep well.'], 'coral':['/ˈkɔːrəl/','Colorful fish live near the coral.'],
  'tongue':['/tʌŋ/','The dog stuck out its tongue.'], 'noisy':['/ˈnɔɪzi/','The classroom is too noisy.'],
  'colorful':['/ˈkʌlərfəl/','The bird has colorful feathers.'], 'dangerous':['/ˈdeɪndʒərəs/','It is dangerous to play near traffic.'],
  'safe':['/seɪf/','The children are safe here.'], 'look like':['/lʊk laɪk/','The cloud looks like a rabbit.'],
  'tradition':['/trəˈdɪʃən/','Making dumplings is a family tradition.'], 'traditional':['/trəˈdɪʃənəl/','We wore traditional clothes.'],
  'especially':['/ɪˈspeʃəli/','I like fruit, especially mangoes.'], 'continue':['/kənˈtɪnjuː/','Please continue reading.'],
  'add':['/æd/','Add some sugar to the tea.'], 'local':['/ˈloʊkəl/','We bought food at the local market.'],
  'enjoy':['/ɪnˈdʒɔɪ/','I enjoy reading after school.'], 'important':['/ɪmˈpɔːrtənt/','Sleep is important for children.'],
  'popular':['/ˈpɑːpjələr/','Basketball is popular at our school.'], 'japanese':['/ˌdʒæpəˈniːz/','She is learning Japanese.'],
  'hawaii':['/həˈwaɪi/','Hawaii has many beautiful beaches.'], 'vacation':['/veɪˈkeɪʃən/','We visited the sea on vacation.'],
  'mochi':['/ˈmoʊtʃi/','Mochi is soft and sweet.'], 'grandparent':['/ˈɡrænperənt/','My grandparent tells great stories.'],
  'member':['/ˈmembər/','Every member helped the team.'], 'usually':['/ˈjuːʒuəli/','I usually walk to school.'],
  'aunt':['/ænt/','My aunt lives nearby.'], 'family store':['/ˈfæməli stɔːr/','They run a small family store.'],
  'be called':['/bi kɔːld/','This fruit can be called a melon.'], 'landscape':['/ˈlændskeɪp/','The mountain landscape is beautiful.'],
  'build':['/bɪld/','They will build a new bridge.'], 'building':['/ˈbɪldɪŋ/','That tall building is a library.'],
  'real':['/ˈriːəl/','Is that a real dinosaur bone?'], 'fresh':['/freʃ/','These apples are fresh.'],
  'carefully':['/ˈkerfəli/','Please carry the glass carefully.'], 'pineapple':['/ˈpaɪnæpəl/','The pineapple tastes sweet.'],
  'vegetable':['/ˈvedʒtəbəl/','A carrot is a vegetable.'], 'other':['/ˈʌðər/','The other door is open.'],
  'melon':['/ˈmelən/','We cut the melon into pieces.'], 'watermelon':['/ˈwɔːtərmelən/','Watermelon is juicy and sweet.'],
  'below':['/bɪˈloʊ/','The valley is below the mountain.'], 'homemade':['/ˌhoʊmˈmeɪd/','This bread is homemade.'],
  'rice':['/raɪs/','We eat rice with vegetables.'], 'noodle':['/ˈnuːdəl/','The noodle soup is hot.'],
  'salad':['/ˈsæləd/','She made a fruit salad.'], 'bread':['/bred/','I had bread for breakfast.'],
  'be made of':['/bi meɪd əv/','The table is made of wood.'], 'in fact':['/ɪn fækt/','In fact, dolphins are mammals.'],
  'dream':['/driːm/','Her dream is to be a teacher.'], 'enough':['/ɪˈnʌf/','We have enough time.'],
  'early':['/ˈɝːli/','I arrived at school early.'], 'finish':['/ˈfɪnɪʃ/','Please finish your homework.'],
  'always':['/ˈɔːlweɪz/','She always helps her friends.'], 'leave':['/liːv/','We leave home at eight.'],
  'village':['/ˈvɪlɪdʒ/','My grandparents live in a village.'], 'history':['/ˈhɪstəri/','We learned about local history.'],
  'kindergarten':['/ˈkɪndərɡɑːrtən/','My little brother goes to kindergarten.'], 'college':['/ˈkɑːlɪdʒ/','She wants to study art in college.'],
  'marry':['/ˈmeri/','They plan to marry next year.'], 'write':['/raɪt/','Please write your name here.'],
  'educate':['/ˈedʒukeɪt/','Schools educate young people.'], 'geography':['/dʒiˈɑːɡrəfi/','We study maps in geography.'],
  'pe':['/ˌpiː ˈiː/','We play games in PE class.'], 'science':['/ˈsaɪəns/','We did an experiment in science.'],
  'math':['/mæθ/','I solved the math problem.'], 'art':['/ɑːrt/','We painted flowers in art class.'],
  'similarity':['/ˌsɪməˈlerəti/','I found a similarity between the pictures.'], 'get married with':['/ɡet ˈmerid wɪð/','She got married with her family present.'],
  'after school':['/ˈæftər skuːl/','We play football after school.'], 'elementary school':['/ˌeləˈmentəri skuːl/','My sister is in elementary school.'],
  'high school':['/ˈhaɪ skuːl/','He will start high school next year.'], 'smart':['/smɑːrt/','The smart dog learned a new trick.'],
  'communicate':['/kəˈmjuːnɪkeɪt/','People communicate in many ways.'], 'communication':['/kəˌmjuːnɪˈkeɪʃən/','Good communication helps a team.'],
  'understand':['/ˌʌndərˈstænd/','I understand the question now.'], 'point':['/pɔɪnt/','Please point to the red circle.'],
  'hot':['/hɑːt/','The soup is too hot.'], 'warm':['/wɔːrm/','The sun feels warm.'], 'cold':['/koʊld/','The water is cold.'],
  'cool':['/kuːl/','The evening air is cool.'], 'like':['/laɪk/','The cloud looks like a whale.'],
  'research':['/rɪˈsɝːtʃ/','The students did research on dolphins.'], 'human':['/ˈhjuːmən/','Every human needs clean water.'],
  'speak':['/spiːk/','Can you speak English?'], 'teach':['/tiːtʃ/','Our teacher will teach us a new song.'],
  'distance':['/ˈdɪstəns/','The distance to school is two kilometers.'], 'dolphin':['/ˈdɑːlfɪn/','The dolphin jumped out of the water.'],
  'alone':['/əˈloʊn/','The child did not want to walk alone.'], 'group':['/ɡruːp/','We worked in a small group.'],
  'sound':['/saʊnd/','That idea sounds good.'], 'smell':['/smel/','The flowers smell sweet.'], 'both':['/boʊθ/','Both answers are correct.'],
  'bonobo':['/bəˈnoʊboʊ/','A bonobo is a clever ape.'], 'point to':['/pɔɪnt tuː/','Point to the word you hear.'],
  'between a and b':['/bɪˈtwiːn eɪ ænd biː/','The ball is between A and B.'], 'make a fire':['/meɪk ə ˈfaɪər/','We learned how to make a fire safely.'],
  'play the piano':['/pleɪ ðə piˈænoʊ/','My sister can play the piano.'], 'pop-up':['/ˈpɑːp ʌp/','We visited a pop-up market.'],
  'create':['/kriˈeɪt/','We can create something new.'], 'creative':['/kriˈeɪtɪv/','She found a creative solution.'],
  'customer':['/ˈkʌstəmər/','The customer paid for the meal.'], 'try':['/traɪ/','Try this new game.'],
  'pay':['/peɪ/','I will pay at the counter.'], 'buy':['/baɪ/','We need to buy some bread.'], 'sell':['/sel/','They sell fresh fruit here.'],
  'instead':['/ɪnˈsted/','We walked instead.'], 'common':['/ˈkɑːmən/','This is a common mistake.'],
  'quiet':['/ˈkwaɪət/','Please be quiet in the library.'], 'only':['/ˈoʊnli/','There is only one cookie left.'],
  'business':['/ˈbɪznəs/','Her family owns a small business.'], 'cheap':['/tʃiːp/','The bag was cheap but useful.'],
  'expensive':['/ɪkˈspensɪv/','That watch is too expensive.'], 'meal':['/miːl/','Breakfast is my first meal of the day.'],
  'single':['/ˈsɪŋɡəl/','I found a single red flower.'], 'singapore':['/ˈsɪŋəpɔːr/','Singapore is a city and a country.'],
  'describe':['/dɪˈskraɪb/','Can you describe the animal?'], 'explain':['/ɪkˈspleɪn/','Please explain your answer.'],
  'inference':['/ˈɪnfərəns/','We made an inference from the clues.'], 'a few':['/ə fjuː/','I have a few questions.'],
  'a little':['/ə ˈlɪtəl/','Please add a little water.'], 'tv program':['/ˌtiː ˈviː ˈproʊɡræm/','We watched a science TV program.'],
  'pay for':['/peɪ fɔːr/','I used my card to pay for lunch.'], 'instead of':['/ɪnˈsted əv/','We took the bus instead of walking.'],
  'pop-up store':['/ˈpɑːp ʌp stɔːr/','The pop-up store is open this week.']
};

UNITS.forEach(unit => unit.words.forEach(word => {
  const content = WORD_CARD_CONTENT[word.w.toLowerCase()];
  if (!content) return;
  if (!word.ph) word.ph = content[0];
  if (!word.ex) word.ex = content[1];
}));
