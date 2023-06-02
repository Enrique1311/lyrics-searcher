const $form = document.getElementById("song-search"),
	$loader = document.querySelector(".loader"),
	$error = document.querySelector(".error"),
	$main = document.querySelector("main"),
	$artist = document.querySelector(".artist"),
	$song = document.querySelector(".song");

$form.addEventListener("submit", async (e) => {
	e.preventDefault();

	try {
		$loader.style.display = "block";

		let artist = e.target.artist.value.toLowerCase(),
			song = e.target.song.value.toLowerCase(),
			$artistTemplate = "",
			$songTemplate = "",
			artistAPI = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`,
			songAPI = `https://api.lyrics.ovh/v1/${artist}/${song}`,
			artistFetch = fetch(artistAPI),
			songFetch = fetch(songAPI),
			[artistRes, songRes] = await Promise.all([artistFetch, songFetch]),
			artistData = await artistRes.json(),
			songData = await songRes.json();

		console.log(artistRes, songRes);
		console.log(artistData, songData);
	} catch (error) {
		console.log(error);
		let message = error.statusText || "An error occurred...";
		$error.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
		$loader.style.display = "none";
	}
});
