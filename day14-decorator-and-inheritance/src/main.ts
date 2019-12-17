function LogProxy(when: 'before' | 'after' | 'all') {
  return function(_target: any, key: string, desc: PropertyDescriptor) {
    const prev = desc.value;
    const next = function() {
      if (when === 'before' || when === 'all') {
        console.log(`${this.name}.${key} will start.`);
      }
      const result = prev.apply(this);
      if (when === 'after' || when === 'all') {
        console.log(`${this.name}.${key} has finished.`);
      }
      return result;
    };
    desc.value = next;
  };
}

let effectContainer = {};
let effectCounter = 0;

function Effect(str: string) {
  return function(target: any, key: string) {
    const className = target.constructor.name;
    const prev = effectContainer[className];
    effectContainer[className] = { ...prev, [key]: str };
    effectCounter++;
  };
}

class User {
  @Effect('decorating User.name property')
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @LogProxy('all')
  sayHello() {
    console.log(`Hello, I am ${this.name}.`);
  }
}

class JapaneseUser extends User {
  @Effect('decorating JapaneseUser.name property')
  name: string;

  constructor(name: string) {
    super(name);
    this.name = name;
  }

  sayHello() {
    console.log(`こんにちは、私は${this.name}です。`);
  }
}

const alice = new User('alice');
alice.sayHello();
const beth = new User('beth');
beth.sayHello();
const arisu = new JapaneseUser('有栖');
arisu.sayHello();

console.log(effectContainer);
console.log(effectCounter)
