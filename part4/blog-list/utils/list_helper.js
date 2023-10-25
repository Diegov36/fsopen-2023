var lod = require('lodash')
var array = require('lodash/array')
var object = require('lodash/fp/object');
var collection = require('lodash/collection')
var math = require('lodash/math')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const initialValue = 0
    const sum = blogs.reduce((accumulator, actualValue) => accumulator + actualValue.likes, initialValue)
    return sum

}

const favoriteBlog = (blogs) =>{
    blogs.sort((a,b) => b.likes - a.likes)
    return blogs[0]
}

const mostBlogs = (blogs) => {    
    let a = collection.countBy(blogs, (blog) => {
        return blog.author
    })        
    let maxBlogCount = math.max(object.values(a))
    const element = collection.find(object.toPairs(a), obj => obj[1] === maxBlogCount)
    return {author: element[0], blogs: element[1]}
}

const mostLikes = (blogs) => {
    let a = collection.groupBy(blogs, blog => blog.author)
    let names = object.keys(a)    
    a = collection.map(a, blog => collection.map(blog, el => {
        return {
            author: el.author,
            likes: el.likes
        }
    }))        
    a = collection.map(a, (el) => {                
        return collection.reduce(el, (ant, value) => value.likes + ant , 0)                 
    })      
    
    names = array.zip(a, names)
    console.log(math.max(a))
    const mostLikes = collection.find(names, name => name[0] === math.max(a))
    return{author: mostLikes[1],
    likes: mostLikes[0]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}