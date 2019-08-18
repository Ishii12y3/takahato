// 食物連鎖のシミュレータ

//定数 (const) は、 let 文を使って定義する変数と同じ、ブロックスコープ。定数の値は、再代入による変更はできず、再宣言もできない。
const INIT = 16; // 生物の初期サイズ
const MIN = 10; // 生存最小サイズ
const MAX = 40; // 成熟サイズ
const NEAR = 20; // 隣接判定距離
const DENSITY = 8; // 共存可能個体数
const RANGE = 50; // 種子が飛散する最大距離

//let 文はブロックスコープの局所変数を宣言。任意で値を代入して初期化可能。
let plants = new Plants();

//Function クラスは、関数用クラス。
function setup() {
  createCanvas(windowWidth, windowHeight);
  const p = createVector(windowWidth, windowHeight).div(2); // 画面中央
  const plant = new Plant(p);
  plants.add(plant);
}

function draw() {
  background(0);
  plants.update();
  plants.draw();
  textSize(32);
  fill(250);
  text(plants.size, 10, 50);
}
