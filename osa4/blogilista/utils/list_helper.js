var _ = require('lodash')

const dummy = (blogs) => {
return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0 
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((acc, current) => acc.likes > current.likes ? acc : current)
  return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
    var mapAuthor = _.map(blogs, 'author')
    var mostCommonAuthor = _.chain(mapAuthor).countBy().toPairs().max(_.last).head().value()
    var numberOfBlogs = blogs.filter((obj) => obj.author === mostCommonAuthor).length
    return {
        author: mostCommonAuthor,
        blogs: numberOfBlogs
    }
    


}




const mostLikes = (blogs) => {

    const authorLikes =  blogs.reduce((acc, {author, likes}) => {

        acc[author] = acc[author] || 0
        acc[author] += likes
        return acc
    }, {})
    


const mostLikedAuthor = Object.keys(authorLikes).sort((x,y) => authorLikes[y] - authorLikes[x])[0]
return {
    author: mostLikedAuthor,
    likes: authorLikes[mostLikedAuthor]
}
}





module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}