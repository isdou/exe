import { Recipe } from './types';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'r01',
    name: '肉骨茶 (Bak Kut Teh)',
    country: 'Malaysia',
    cuisine: '南洋华裔菜',
    description: '排骨炖制极烂，汤头具有极高浓度的药材香气与白胡椒的辛辣感。',
    image: 'images/rougucha.jpg',
    difficulty: 3,
    ingredients: ['猪肋排', '当归', '党参', '枸杞', '大蒜', '白胡椒粒'],
    story: '在马来西亚餐厅进行的采样。虽然火候到位，但强烈的药味对系统而言尚需时间解析，是一次独特的味觉边界探索。',
    rating: 3,
    recordDate: '2026-01-02'
  },
  {
    id: 'r02',
    name: '小炒黄牛肉',
    country: 'China',
    cuisine: '湘/赣菜系',
    description: '高温快火锁住肉汁，鲜嫩度极高。芹菜与橘皮的加入提供了出色的风味平衡。',
    image: 'images/xiaochaohuangniurou.jpg',
    difficulty: 2,
    ingredients: ['黄牛肉', '西芹', '陈皮/鲜橘皮', '小米辣', '大蒜'],
    story: '采样于赣江里。陈皮的香气彻底化解了牛肉的油脂感，被判定为“米饭杀手”级算法，极具复现价值。',
    rating: 4.5,
    recordDate: '2026-01-03'
  },
  {
    id: 'r03',
    name: '冬阴功 (Tom Yum Goong)',
    country: 'Thailand',
    cuisine: '泰式料理',
    description: '酸、辣、甜、咸四种维度的完美对冲，热带香料的嗅觉冲击力极强。',
    image: 'images/tomyum.jpg', 
    difficulty: 4,
    ingredients: ['大虾', '香茅', '南姜', '柠檬叶', '草菇', '椰奶'],
    story: '泰国味觉系统的基石。香茅和南姜的组合像是热带雨林的信号，每一次采样都能激活沉睡的味蕾模块。',
    rating: 5,
    recordDate: '2026-02-15'
  }
];