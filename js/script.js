up_btn = document.querySelector("button#upload");
choose = document.querySelector("input[type=file]#choose");
output = document.getElementById("output");
dl = document.getElementById('dl');
copy = document.getElementById('copy');

up_btn.onclick = function(){
	choose.click();
}

function fileUploaded(){
	resetOutput();
	file = choose.files[0].name;
	size = ((choose.files[0].size)/1024)/1024 + " MB";
	type = choose.files[0].type;
	const reader = new FileReader();
    reader.addEventListener('load', event => {
		output.src = event.target.result;
    });
    reader.readAsDataURL(choose.files[0]);
    output.alt = choose.files[0].name;
    document.getElementById("name").value = file;
}

choose.onchange = function(){
	if(choose.files.length == "1" && choose.files[0].type.includes("image/")){
		document.querySelector("#status").classList.add("hidden");
		fileUploaded();
		output.classList.remove('hidden');
		dl.classList.remove("hidden");
		document.getElementById("download_button").classList.remove("hidden");
		copy.classList.remove("hidden");
	}
	else{
		document.querySelector("#status").classList.remove("hidden");
		resetOutput();
		output.classList.add('hidden');
		dl.classList.add("hidden");
		document.getElementById("download_button").classList.add("hidden");
		copy.classList.add("hidden");
	}
}

function resetOutput(){
	output.src = "";
	output.alt = "";
	output.removeAttribute("width");
	output.removeAttribute("height");
	output.rotate = "";
}


function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const downloadButton = document.querySelector("#download");

function toggleModal() {
	modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
downloadButton.addEventListener("click", function(){
	downloadURI(output.src,document.getElementById("name").value);
	toggleModal();
});
window.addEventListener("click", windowOnClick);

copy.onclick = function(){
navigator.clipboard.writeText(output.src).then(function() {
  console.log('Async: Copying to clipboard was successful!');
}, function(err) {
  console.error('Async: Could not copy text: ', err);
});
}
