import { of, interval, timer, from, fromEvent, Observable } from 'rxjs';

let observable = Observable.create((observer:any) => {
    try {
        observer.next("hey")
        setInterval(() => {
            observer.next("b")
        }, 300)
    } catch (err) {
        observer.error(err)
    }
})


let obs = observable.subscribe(
    (x:any) => logItem(x),
    (error:any) => logItem(error),
    () => logItem("Completed")
    )

let obs2 = observable.subscribe(
    (x:any) => logItem(x))


// makes obs2 a 'child' subscriber of obs
obs.add(obs2)

setTimeout(() => obs.unsubscribe(), 500)

// Handling events

const clicks = fromEvent(document, 'click')

clicks.subscribe((x:any) => {
    console.log(x)
    logItem("Click!")
})

// Handling promises

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("resolved")
    }, 1000)
})


const obsvPromise = from(promise);

obsvPromise.subscribe(result => logItem(result))

// Timer

const src1 = timer(1000)

src1.subscribe((val) => logItem(val))


const src2 = interval(1000)

src2.subscribe((val) => logItem(new Date().getSeconds()))


// Observable declaration

const mashup = of('any', ['thing'], 12, true, {ok: 'boomer'})

mashup.subscribe((val) => logItem(val))

// cold and hot observables
// .finally() perform and action when a subscription ends
// .map() like Array.map()
// .do() perform an action at any point in the pipe() - used for debugging
// .filter() filters values from observable
// .first() and .last() returns first and last values from observable
// .debounce() and .throttle() responds to events at beginning and end of timestamps
// .scan() like Array.reduce()
// .switchMap() to require an observable to perform an action
// .takUntil() perform action by timer
// .takeWhile() perforn an action while a value is true
// .zip() combine observables of same length and connected (by index)
// .forkJoin() delay before joining
// .catch() like catch in try...catch
// .retry() rerun observable a certain number of time when an error is occured
// Subject = an observable to which observers can add value
// .multicast() send values to multiple subscribers without sideeffects (run once for each subscriber)





function logItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}