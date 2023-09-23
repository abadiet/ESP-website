var button = document.getElementById('collapsible-activator');
var collapsibleContent = document.getElementById('collapsible-content');

button.addEventListener('mouseover', function() {
    collapsibleContent.classList.add('show');
});

button.addEventListener('mouseout', function() {
    collapsibleContent.classList.remove('show');
});