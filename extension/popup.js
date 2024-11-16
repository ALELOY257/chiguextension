document.getElementById('analisis').addEventListener("click", () => {alert("Button clicked");});

//add a box
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('addBox').addEventListener('click',function(){
        const content = document.getElementById("boxContent").value;
        if (content.trim() === ''){
            alert('añadir contenido');
            return;
        }

        const newBox = document.createElement('div');
        newBox.classList.add('grid-box');
        newBox.textContent = content;

        document.getElementById("mainGrid").appendChild(newBox);

        document.getElementById('boxContent').value = '';
    });
});