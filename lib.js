/*
動作不明
*/
function easing(x) {
  return x;
}

/*
MapクラスからPlantsクラスを作成 
※Mapクラス
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
※Setメソッド
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/set
※Deleteメソッド
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
*/
class Plants extends Map {
  add(plant) {
    this.set(plant.id, plant);
    this.count();
  }
  remove(plant) {
    this.delete(plant.id);
    this.count();
  }
  /*
  下記 plant数数えてるのはわかるけど、何してんのこれ。
  ※for ... of 文
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of

  　for (variable of iterable) {
  　　statement
　　}
  variable：それぞれの反復処理において、別々のプロパティの値が variable に代入されます。
　iterable：列挙可能なプロパティに対して、反復処理を行うオブジェクトです。
  
　※Valuesメソッド
　https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/values
  */ 

  // 近接生物数、自身を含む
  count() {
    for (const plant of this.values()) {
      plant.count = [...this.values()].filter((other) => {
        return plant.p.dist(other.p) < plant.size * 2;
      }).length;
    }
  }
  update() {
    for (const plant of this.values()) {
      if (plant.size < MIN) {
        this.remove(plant);
      } else if (plant.size > MAX) {
        const child = plant.create();
        this.add(child);
      }
      plant.update();
      plant.draw();
    }
  }
  draw() {
    for (const plant of this.values()) {
      plant.draw();
    }
  }
}

/*
constructor メソッドは、class で作成されたオブジェクトの生成と初期化のための特殊なメソッドです。
※constructorメソッド
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/constructor
*/
class Plant {
  constructor(p) {
    this.p = p;
    this.id = random(1000000);
    this.size = INIT;
    this.count = 1; // 近隣生物の数
  }
  create() {
    const q = p5.Vector.random2D().mult(random(RANGE)).add(this.p);
    const x = constrain(q.x, 0, windowWidth);
    const y = constrain(q.y, 0, windowHeight);
    return new Plant(createVector(x, y));
  }
  update() {
    // 十分なスペースで成長し、過密で衰弱する
    if (this.count < DENSITY) {
      this.size += 1;
    } else {
      this.size -= 2;
    }
    /*
    削除条件追加するならここかな？
    マウスオーバーしたものを衰弱させるとか可能……？
    ・マウスカーソルの位置取得
    ・plantの位置取得……？
    ・plant、マウスカーソルの位置が同じであればsize = 0
    */
  }

  /*
　※fillメソッド
　https://p5js.jp/reference/#/p5/fill
　
  ※circleメソッド
  https://p5js.org/reference/#/p5/circle
  */
  draw() {
    /*
    追加。plantの色をランダムに生成。目にやさしくない。後日修正
    ※参考
    https://qiita.com/_shimizu/items/e3826359b328974c9911
    */
    function colorGen(){ 
      return '#'+Math.floor(Math.random()*16777215).toString(16); 
    }
    fill(colorGen());
    circle(this.p.x, this.p.y, this.size);
  }
}
