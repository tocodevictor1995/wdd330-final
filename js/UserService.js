class UserService {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }

    addFavorite(city) {
        if (!this.favorites.includes(city)) {
            this.favorites.push(city);
            this.saveFavorites();
        }
    }

    removeFavorite(city) {
        const index = this.favorites.indexOf(city);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
        }
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
}
