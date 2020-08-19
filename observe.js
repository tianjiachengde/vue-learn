const person = {
    name: 'tian',
    'age': 18,
    'list': [1, 2, 3],
    'hobby': {
        eat: 'orange',
        play: {a: 22}
    }
}
console.log(person)
observe(person)
person.age = 23
person.list[2]=33333
person.list.push(4) //未监听到
person.hobby.play = 'basketball'
console.log('after:', person)


function observe(data) {
    if (!isObject(data)) return

    Object.keys(data).forEach(key => {
        if (isObject(data[key])) observe(data[key])
        defineReactive(data, key, data[key])
    })
}

function isObject(data) {
    return typeof data === 'object'
}

function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key,
        {
            enumerable:true,
            configurable:false,
            get: function () {
                console.log(`get:${key}`)
                return val
            },
            set: function (newVal) {
                val = newVal
                console.log(`set:${key} = ${newVal}`)
            }
        }
    )
}