$(document).on('click', 'a', function(e) {
	e.preventDefault();
	const to = $(this).prop('href'); //②目的地の絶対パス
    const num = to.indexOf('/wiki/');
    if(0 <= num) {
        const result = to.substr( num + 6 );
        window.parent.postMessage(result);
    };
});