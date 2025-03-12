// exercise 2

export type Movie = { id: string, title: string; };

export class Exercise2 {
    #movies: Record<string, Movie[]> = {}; // example: { thriller: [{ id: '1', title: 'The American'}, { id: '2', title: 'Arcadian'}] }

    add_movie_in_genre(genre: string, new_movie: Movie): boolean {
      if (!this.#movies[genre]) {
        this.#movies[genre] = [];
      }

      if (this.#movies[genre].find(movie => movie.id === new_movie.id)) {
        return false;
      }

      this.#movies[genre].push(new_movie);
      return true;
    }

    update_movie_title_by_genre_and_movie_id(genre: string, movie_id: string, new_title: string): boolean {
        const movie = this.#movies[genre].find(movie => movie.id === movie_id);

        if (!movie) {
            return false;
        }

        movie.title = new_title;
        return true;
    }

    delete_movie_by_genre_and_movie_id(genre: string, movie_id: string): boolean {
      if (!this.#movies[genre]) {
        return false;
      }

      const movie = this.#movies[genre].find(movie => movie.id === movie_id);

      if (!movie) {
          return false;
      } else {
          this.#movies[genre] = this.#movies[genre].filter(movie => movie.id !== movie_id);
      }

      return true;
    }

    get_movie_title_by_id(genre: string, movie_id: string): string {
        const movie = this.#movies[genre].find(movie => movie.id === movie_id);

        return movie ? movie.title : 'Movie not found';
    }

    get_movies(): Record<string, Movie[]> {
      return this.#movies;
  }
}

const x = new Exercise2();
console.log("first", x.get_movies()); // {}

x.add_movie_in_genre('thriller', { id: '1', title: 'The American' });
x.add_movie_in_genre('thriller', { id: '2', title: 'Arcadian' });
console.log("second", x.get_movies()); // { thriller: [ { id: '1', title: 'The American' }, { id: '2', title: 'Arcadian' } ] }

console.log(x.get_movie_title_by_id('thriller', '1')); // The American
console.log(x.get_movie_title_by_id('thriller', '2')); // Arcadian
console.log(x.get_movie_title_by_id('thriller', '3')); // Movie not found

console.log(x.update_movie_title_by_genre_and_movie_id('thriller', '1', 'The American 2')); // true
console.log("third", x.get_movies()); // { thriller: [ { id: '1', title: 'The American 2' }, { id: '2', title: 'Arcadian' } ] }

console.log(x.get_movie_title_by_id('thriller', '1')); // The American 2

console.log(x.delete_movie_by_genre_and_movie_id('thriller', '2')); // true
console.log(x.delete_movie_by_genre_and_movie_id('thriller', '2')); // false
console.log(x.get_movie_title_by_id('thriller', '2')); // Movie not found
console.log(x.get_movie_title_by_id('thriller', '1')); // The American 2
console.log("fourth", x.get_movies()); // { thriller: [ { id: '1', title: 'The American 2' } ] }

console.log(x.add_movie_in_genre('thriller', { id: '1', title: 'The American' })); // false because we check by id. so even if titles are different, the check is by id.
console.log("fifth", x.get_movies()); // { thriller: [ { id: '1', title: 'The American 2' } ] }
