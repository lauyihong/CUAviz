const sublimeImage = '<img src="https://upload.wikimedia.org/wikipedia/en/7/7b/Sublime-RobbinTheHood.jpg" />'

const blinkImage = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Blink-182_-_Dude_Ranch_cover.jpg/220px-Blink-182_-_Dude_Ranch_cover.jpg" />'

const countingCrowsImage = '<img src="https://upload.wikimedia.org/wikipedia/en/9/95/CountingCrowsAugustandEverythingAfter.jpg" />'

function setImage(imageHtml) {
    $('#right').empty().prepend(imageHtml)
}

$('.sublime').on('click', function () {
    setImage(sublimeImage)
    console.log('click!', sublimeImage)
})

$('.blink').on('click', function () {
    setImage(blinkImage)
})

$('.counting-crows').on('click', function () {
    setImage(countingCrowsImage)
})

// string variable
var foo = '2'

foo = '3'

// number variable
const bar = 3

// add numbers
console.log(bar + 100) // 103

const newNumber = bar * 10 // 30

console.log('newNumber is', newNumber)

// arrays

const myArray = ['larry', 'curly', 'moe']

console.log(myArray[0], ' is in position 0') // 'larry'

myArray.forEach(function (stooge, i) {
    // template literal
    const sentence = `${stooge} is in position ${i}`
    console.log(sentence)
})

// objects
const myObject = {
    firstName: 'Chris',
    lastName: 'Whong',
    livesIn: 'Brooklyn',
    teachesAt: 'NYU'
}

const anotherObject = {
    firstName: 'Water',
    lastName: 'Bottle',
    livesIn: 'Manhattan',
    teachesAt: 'NYU'
}

const anotherSentence = `${myObject.firstName} ${myObject.lastName} is an adjunct professor at ${myObject.teachesAt}.  He lives in ${myObject.livesIn}`

console.log(anotherSentence);

const professorsArray = [
    {
        firstName: 'Chris',
        lastName: 'Whong',
        livesIn: 'Brooklyn',
        teachesAt: 'NYU'
    },
    {
        firstName: 'Water',
        lastName: 'Bottle',
        livesIn: 'Manhattan',
        teachesAt: 'NYU'
    }
]
console.log('Here are the professors first names:')
professorsArray.forEach(function(professor) {
    console.log(professor.firstName)
})
