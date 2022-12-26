// Конспект, порядок вывода
// 1) console.log()
// 2) new Promise((resolve, reject) => { console.log() })
// 3) process.nextTick()
// 4) Promise.resolve().then()
// 5) setTimeout()
// 6) setImmediate(() => console.log())

console.log("Record 1");                                    //синхронная операция выводится 1 (первым)

setTimeout(() => {
  console.log("Record 2");                                  //синхронная операция в коллбэка setTimeout выводится 4 (четвертым)
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log("Record 3");                              //синхронная операция в коллбэке выводится 5 (пятым)
      Promise.resolve().then(() => {
        console.log("Record 4");                            //выполнится последний вызов из коллбэка промиса выводится 6 (шестым)
      });
    });
  });
});

console.log("Record 5");                                    //синхронная операция выводится 2 (вторым)

Promise.resolve().then(() =>
  Promise.resolve().then(() => console.log("Record 6"))     //синхронная операция коллбэка вложенного промиса выводится 3 (третьим)
);

//порядок вывода Record : 1,5,6,2,3,4