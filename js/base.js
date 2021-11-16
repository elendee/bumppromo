import env from './env.js?v=8'

const links = document.querySelectorAll('a')

const header = document.querySelector('#header')
const nav_items = header.querySelectorAll('.nav-item')

const paths = document.querySelectorAll('#hero-image svg path')

const nav_toggle = header.querySelector('.nav-item.toggle')

const locale = location.href.match(/localhost/) || location.href.match(/resource.oko/) ? 'dev' : 'live'


const add_cases = item => {
	
	const use_cases = [{
		title: 'golf',
		href: 'golf',
	},{
		title: 'hair',
		href: 'hair',
	}]
	const ul = document.createElement('ul')
	for( const use of use_cases ){
		ul.appendChild( build_use_link( use ) )
	}
	item.appendChild( ul )

}


const build_use_link = use => {

	const item = document.createElement('div')
	item.classList.add('use-case')
	const link = document.createElement('a')
	link.href = env.APP_ROOT + 'use-cases/' + use.href
	link.innerHTML = use.title
	item.appendChild( link )
	return item

}





// INIT


// easier to add / remove use case links from this single place than all html files:
for( const item of nav_items ){
	if( item.innerText.match(/cases/i)){
		add_cases( item )
		break;
	}
}


// rewrite links to environment
for( const link of links ){
	if( locale === 'dev' && link.href ){
		const split = link.href.split('/')
		link.href = env.APP_ROOT + split[ split.length -1 ]
	}
}

const rand_range = ( min, max ) => {
	const rand = Math.random() * ( max - min )
	return min + rand
}

setInterval(() => {
	for( const path of paths ){
		path.style.transform = 'scaleX(' + rand_range( .95, 1 ) + ') scaleY(' + rand_range( .95, 1 ) + ')'
		// let string = path.getAttribute('d').split(' ').map( point => {
		// 	if( point.match(/[a-zA-Z]/ ) ) return point
		// 	point = Number( point ) + ( ( Math.random() * 10 ) - 5 )
		// 	return point
		// })
		// path.setAttribute('d', string.join(' ') )
	}
},1500 )

nav_toggle.addEventListener('click', () => {
	nav_items.forEach( ele => {
		ele.classList.toggle('toggled')
	})
})


document.addEventListener('scroll', e => {
	if( window.pageYOffset > 50 ){
		document.body.classList.add('scrolled')
	}else{
		document.body.classList.remove('scrolled')
	}
})