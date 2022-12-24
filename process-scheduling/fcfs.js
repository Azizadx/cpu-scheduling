class Task {
    constructor(name, iterations) {
        this.name = name
        this.index = 0;
        this.iterations = iterations;
    }

    run() {
        this.index++;
        process.stdout.write(this.name + " " + Math.floor((this.index / this.iterations) * 100) + "% \r");
    }

    onFinish() {
        console.log(this.name + " 100%")
    }
}

class Scheduler {
    constructor() {
        this.tasks = []; // the queued tasks
    }

    addTask(task) {
        this.tasks.push(task)
    }
    run() {
        while (this.tasks.length) {
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
            }
            else {
                this.tasks[0].onFinish()
                this.tasks.shift();
            }
        }
    }
}

const scheduler = new Scheduler();

scheduler.addTask(new Task("A", 1000000));
scheduler.addTask(new Task("B", 3000000));
scheduler.addTask(new Task("C", 4000000));
scheduler.addTask(new Task("D", 2000000));

scheduler.run();