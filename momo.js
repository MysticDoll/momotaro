(function(){
  "use strict";
  var granma, granpa;
  var delayTime = 1000;
  var console = {};

  console.log = function(arg){
    window.console.log(arg);
    document.querySelector("div.logArea").innerHTML += `<p>${arg}</p>`;
  }

  class Human {
    constructor(name){
     this.name = name;
     this.where = "home";
   }
  }

  class Animal {
    constructor(type) {
     this.type = type;
   }
  }

  class Kibidango {
  }

  class Momotaro extends Human{
    constructor(name){
      super(name);
      this.equipments = [];
      this.party = [];
      this.where = "peach";
    }

    invite(target) {
      if(this.equipments.pop() instanceof Kibidango){
        this.party.push(target);
        console.log(`きびだんごで${target.type}を仲間にした`);
        return this;
      } else {
        return Promise.reject(new Error(`${this.name} has no Kibidango`));
      }
    }

    beatOni(){
      if(this.party.map(function(member){
        return member instanceof Animal;
      }).length === 3){
        console.log("鬼を倒したのでめでたし");
      } else {
        return Promise.reject(new Error(`${this.name} does not have enough members of party`));
      }
    }

  }

  class Granma extends Human{
    constructor(name) {
      super(name);
      this.belongings = [];
    }
    passDango(target) {
      while(target instanceof Momotaro && target.equipments.length < 3){
        target.equipments.push(new Kibidango);
      }

      if(!(target instanceof Momotaro)){
        return Promise.reject(new Error(`${target.name} is not Momotaro`));
      }
      console.log(`${this.name}は${target.name}にきびだんごを三つ渡した`);
      return target;
    }
  }

  class Granpa extends Human{
    breakPeach(peach) {
      if(peach instanceof Peach){
        console.log(`${this.name}は桃を割った。${peach.inner.name}が誕生`);
        return peach.inner;
      } else {
        return Promise.reject(new Error(`${peach} is not Peach`));
      }
    }
  }

  class Peach {
    constructor() {
      this.inner = new Momotaro("NEET");
    }
  }
  
  granma = new Granma("BBA");
  granpa = new Granpa("JJI");
  
  var goOut = function(){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        console.log("お爺さんは山へ芝刈りに、お婆さんは川へ洗濯に");
        granpa.where = "Mountain";
        granma.where = "River";
        resolve();
      }, delayTime);
    });
  };
  
  var donburako = function(){
    return new Promise(function(resolve){
      setTimeout(function(){
        console.log("ドンブラコォッ！！ドンブラコォッ！！！");
        resolve(new Peach());
      }, delayTime);
    });
  }
  
  var gainPeach = function(peach){
    return new Promise(function(resolve){
      setTimeout(function(){
        console.log("お婆さんは桃を拾って帰宅");
        granma.belongings.push(peach);
        granma.where = "home";
        granpa.where = "home";
        resolve();
      },delayTime);
    });
  };
  
  var breakPeach = function(){
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve(granpa.breakPeach(granma.belongings.find(function(item){
          return item instanceof Peach;
        })));
      },delayTime);
    });
  };
  
  var goOnitaiji = function(momotaro){
    return new Promise(function(resolve){
      setTimeout(function(){
        console.log(`${momotaro.name} は鬼退治に行きます`);
        momotaro.where = "Along the way to Onigashima";
        resolve(granma.passDango(momotaro));
      }, delayTime);
    });
  };

  var meetMonkey = function(momotaro){
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve(momotaro.invite(new Animal("Saru")));
      }, delayTime);
    });
  };
  
  var meetDog = function(momotaro){
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve(momotaro.invite(new Animal("Inu")));
      }, delayTime);
    });
  };

  var meetBird = function(momotaro){
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve(momotaro.invite(new Animal("Kiji")));
      }, delayTime);
    });
  };
  
  var arriveOnigashima = function(momotaro){
    return momotaro.beatOni();
  };

  goOut().then(donburako)
         .then(gainPeach)
         .then(breakPeach)
         .then(goOnitaiji)
         .then(meetMonkey)
         .then(meetDog)
         .then(meetBird)
         .then(arriveOnigashima);
})();
