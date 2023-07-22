import React, { useState } from "react"
// import { StyleSheet, Text, View } from "react-native";
import "./App.css"
import MovieCard from "./movieCard.js"

export default function SearchMovies() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const searchMovies = async (e) => {
    e.preventDefault()
    console.log("submitting")

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=ffacdc26cf257d74015765cf8f2981dd&language=en-US&query=${query}&page=1&include_adult=false`
      const res = await fetch(url)
      const data = await res.json()
      setMovies(data.results)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <form className='form' onSubmit={searchMovies}>
        <label htmlFor='query' className='label'>
          Movie Name
        </label>
        <input
          className='input'
          type='text '
          name='query'
          placeholder='i.e Jurassic Park'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className='button' type='submit'>
          Search
        </button>
      </form>
      <div className='card-list'>
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  )
}
