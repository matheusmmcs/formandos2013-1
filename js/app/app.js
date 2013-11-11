StudentModel = Backbone.Model.extend({
	defaults: {
		name: "",
		descriptions: {
			"default": null
		},
		photo: "",
		points: 0
	},
	initialize: function(){

	}
});

StudentsCollection = Backbone.Collection.extend({
	model: StudentModel,
	getMaxPoints: function(){
		var total = 0;
		for(var idx in this.models){			
			total += 5;
		}
		return total;
	},
	getPoints: function(){
		var total = 0;
		for(var idx in this.models){
			var model = this.models[idx];
			total += parseInt(model.get('points'));
		}
		return total;
	},
	qualifyPoints: function(){
		if(this.length == 0){
			return 3;
		}
		var rel = (this.getPoints() / this.getMaxPoints()) * 100;
		if(rel <= 20){
			return 0;
		}else if(rel > 20 && rel <= 40){
			return 1;
		}else if(rel > 40 && rel <= 70){
			return 2;
		}else if(rel > 70 && rel <= 85){
			return 3;
		}else if(rel > 85){
			return 4;
		}
	}
});

//-----//
AppView = Backbone.View.extend({
	el: document,
	events: {
		'mouseover .c-student-pontuation > .glyphicon' : 'hoverGlyphicon',
		'mouseout .c-student-pontuation' : 'mouseOutPontuation',
		'click .c-student-pontuation > .glyphicon' : 'clickPontuation',
		'click .c-btn-next' : 'clickBtnNext',
		'click .c-btn-back' : 'clickBtnBack',
		'click .c-back-route' : 'backRoute',
		'click .accordion-toggle' : 'initializeMaps'
	},
	initialize: function(){
		_.bindAll(this, 'mouseOutPontuation', 'hoverGlyphicon', 'goToAvaliation', 'renderInitialPage', 'clickPontuation');
		//initializing students
		this.students = new StudentsCollection();
		this.students.comparator = function(student) {
  			return student.get("name");
		};
		var student = new StudentModel({
			id: 0,
			name: "Matheus Campanhã",
			shortname: "Matheus",
			descriptions: {
				"default": "Entusiasta em usabilidade e interações de usuários. Quando criança, sonhava ser jogador de futebol, mas esse sonho logo acabou, pois percebeu que a única habilidade dos seus pés era caminhar.<br/><br/>Saudações Rubro-negras!",
				"friends": "Agradeço primeiramente à minha mãe, Márcia, por sua dedicação e esforço para me proporcionar uma excelente educação, além de muito carinho e amor. Aos demais familiares, em especial à minha avó, Maria do Carmo, e aos meus queridos irmãos, Marina e Anderson, pelo companheirismo e apoio sempre. À minha melhor amiga e namorada, Fernanda, e à sua família, que nunca mediram esforços para me apoiar nesta jornada. Aos meus amigos, que me proporcionaram grandes momentos. Aos professores, por me ajudarem a crescer pessoalmente e profissionalmente. Enfim, agradeço a todos que fizeram parte desta importante etapa da minha vida. Essa conquista é nossa!"
			},
			photo: "Matheus.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 1,
			name: "Jurandir Cavalcante",
			shortname: "Jurandir",
			descriptions: {
				"default": "Atuante na área de redes de computadores, e Rei das monitorias da UFPI. Amante de Livros/Games/Cinema e do bom e velho Rock n’ Roll. :p <br/><br/> Vai Corinthians!",
				"friends": "Agradeço primeiramente a meus pais, Jurandir e Sandra, por todo amor, carinho, esforço e dedicação aplicados a mim durante toda a vida.  A meu irmão José Vítor pela paciência, e a Glice pela delicadeza comigo. Agradeço a meus avós, tios e primos por constituírem essa família maravilhosa a qual pertenço. Agradeço ao Expedito Gondim e sua família, por ter me acolhido em sua casa durante o inicio da minha jornada como universitário. Meus “tios” Bertolino e Sandra, Edilberto e Alda pelo apoio. A todos os meus professores (desde o maternal) pelos ensinamentos. A todos os meus amigos por estarem presentes durante os diversos momentos da minha vida, em especial: Fernanda, Nayra, Deborah, Heliana, Thiago B1, Thiago B2, Kassio, Mariana, Emanuela, Jairo e Igo. E por ultimo, agradeço a Deus pela vida e por me proporcionar conhecer todos estes que citei."
			},
			photo: "Jurandir.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 2,
			name: "Pedro Almir",
			shortname: "Pedro",
			descriptions: {
				"default": "Aluno dedicado, que apesar das aparências, não possui parentes no continente asiático. Profundo conhecedor das leis de Murphy. <br/><br/>Procurado na PotyCabana!",
				"friends": "Faltam-me expressões suficientemente adequadas para demonstrar toda minha alegria e gratidão pelo sucesso alcançado nessa etapa. Entretanto essa vitória não é só minha, por isso agradeço primeiramente a Deus e aos meus pais, Antonio Matias e Angélica Rosa. Eles me ensinaram que nada é impossível quando se tem fé e determinação, e juntos construíram a base familiar sólida que me apoia em todos os momentos de fraqueza. Muito obrigado pelo amor, carinho e dedicação. A minha irmã Juliana, pelo apoio incondicional e pelo café das madrugadas de programação. A minha namorada Jayane, pelo amor, força, carinho e paciência. A minha tia Maria da Luz por ser meu porto seguro. Agradeço aos meus avós, tios, primos e especialmente a minha vó Elvira (in memoriam), se agora conquisto mais uma vitória, é porque um dia ela esteve ao meu lado e me ensinou a seguir pelo bom caminho. Aos meus professores, pelos ensinamentos e em especial ao professor Pedro Neto, pelo apoio durante essa jornada. Aos meus amigos e especialmente ao pessoal do TheBest. A todos que fizeram parte dessa conquista, meu muito obrigado."
			},
			photo: "Pedro.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 3,
			name: "Anderson Soares",
			shortname: "Anderson",
			descriptions: {
				"default": "Tornou-se um guia vivo do ANTLR após dominar as monitorias de Compiladores. Nas horas vagas dá aula de Counter Strike. <br/><br/>Head shot! ",
				"friends": "Agradeço aos meus amados pais, Raimundo e Nádia Soares, que sempre colocaram os filhos em primeiro lugar, pelo apoio, incentivo e por toda dedicação. As minhas irmãs, Nágyla e Nara, pela paciência e suporte. Aos meus cunhados, pelos momentos de descontração. Aos meus padrinhos, pela orientação e exemplo. Aos meus familiares, pela união e enorme carinho. À minha namorada Geórgia, pelo companheirismo e compreensão. Aos meus amigos, pelos bons momentos. Agradeço a todos pela torcida que, de alguma forma, me ajudou a finalizar mais esta etapa."
			},
			photo: "Anderson.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 4,
			name: "Janderson",
			shortname: "Janderson",
			descriptions: {
				"default": "Foi desenvolvedor e scrum master em uma equipe de uma pessoa. Grandes habilidades em manipular bovinos com linhas de código. <br/><br/>Friboi é para os fracos!",
				"friends" : "“Mas aquilo que sou, devo à graça de Deus.” Por diversas vezes durante minha caminhada senti tua mão a me guiar e provei da tua misericórdia de Pai. Obrigado Deus, meu Tudo. Dedico esta vitória aos meu pais, Madalena e Antônio. Obrigado por serem meu exemplo de pais, de caráter e de vida. À Janmylla, meu muito obrigado por ser minha irmã preferida (risos). À Fernanda, minha namorada, agradeço pelo companheirismo de todos os dias na UFPI, e na vida. Obrigado por fim, aos que torceram e que fazem parte da minha vitória. Este canudo é nosso!!!"
			},
			photo: "Janderson.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 5,
			name: "Rodolfo",
			shortname: "Rodolfo",
			descriptions: {
				"default": "Grande defensor dos bebedouros do bloco de computação... mas tome cuidado com esse codoense! Se você não colaborar, ouvirá batuques de tambores!",
				"friends": "Gostaria de agradecer e compartilhar esta conquista com todos que estiveram ao meu lado. Agradeço imensamente a Deus, que com o Seu amor, concedeu-me a vida, guiando e protegendo-a. Aos meus pais, Francisco e Graça, pelo amor e grande dedicação, que não pouparam esforços para encorajar-me a seguir em frente e vencer. Aos meus familiares, que com carinho, me apoiam. Aos meus padrinhos, pelo incentivo e suporte. À minha namorada, Ingrid, pelo amor e companheirismo. Aos amigos, pelos momentos felizes dos quais sempre recordarei. Obrigado a todos, por tudo."
			},
			photo: "Rodolfo.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 6,
			name: "Vinicius",
			shortname: "Vinicius",
			descriptions: {
				"default": "Apesar do rosto de nerd, o \"Loro\" pensou em trancar o curso para se tornar tenista profissional, mas para evitar a fadiga, trocou o tenis pelo computador. Atualmente é jogador de Dota nas horas vagas. <br/><br/>O esportista da turma.",
				"friends": "Ofereço essa conquista à minha família, que me apoiou em todos os momentos das minhas jornadas. Agradeço principalmente aos meus pais, Vera e Adail, que proporcionaram todos os ensinamentos para que eu pudesse ser quem eu sou e para que eu fosse capaz de encarar todos os desafios que vierem pela frente. <br/><br/> Eu aprendi uma lição importante no decorrer do curso. Quando as pessoas possuem objetivos em comum suas determinações se somam para se obter um melhor resultado. O nosso objetivo em comum é que todos sejam capazes de vencer os desafios que vêm por aí."
			},
			photo: "Vinicius.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 7,
			name: "Grazianny",
			shortname: "Grazianny",
			descriptions: {
				"default": "Aluno ímpar... durante o curso cresceu bastante, tanto pessoalmente como profissionalmente. Adora jogar basqueste e odeia bola de gude. <br/><br/>Resumindo, uma grande pessoa.",
				"friends": "Agradeço em primeiro lugar a Deus por mais uma conquista, aos meus pais, Sebastião e Mª da Conceição e as minhas irmãs, Kassandra e Kacielle, por me darem amor incondicional, adoção ilimitada, exemplos de honestidade, caráter, valor, às vezes super-protetores. A minha namorada amada Gleisiane, meu cunhado Sandro, pelo apoio e torcida. Aos meus amigos da universidade, pelas recordações, nossa jornada e amizade sincera. Ao meu orientador Vinicius Ponte, pela competência e paciência ímpar. Agradeço a todos pela torcida, que de alguma forma, me ajudaram nessa etapa. Meu muito obrigado!"
			},
			photo: "Grazianny.jpg"
		});
		this.students.push(student);
		this.students.sort();
		this.studentActual = 0;
	},
	initializeMaps: function(){
		setTimeout(initializeGMAPS, 100);
	},
	backRoute: function(e){
		if(e){
			e.preventDefault();
		}
		window.history.back();
	},
	renderStudent: function(){
		var student = this.students.at(this.studentActual).toJSON();
		this._render("c-page-teacher", student);
	},
	clickBtnNext: function(e){
		e.preventDefault();

		//render next student
		if(this.studentActual < this.students.length-1){
			this.studentActual++;
			this.renderStudent();
		}else{
			//show pontuation
			router.navigate("teacher/end", {trigger: true});
		}
	},
	clickBtnBack: function(e){
		e.preventDefault();

		//render previous student
		if(this.studentActual > 0){
			this.studentActual--;
			this.renderStudent();
		}else{
			this.backRoute();
		}
	},
	clickPontuation: function(e){
		var $el = $(e.target);
		var $pontuation = $el.closest('.c-student-pontuation');
		var point = $el.attr('data-point');

		this.starsPontuationIterator({
			pontuation: $pontuation, 
			point: point,
			newClass: "glyphicon glyphicon-star active",
			override: true
		});

		//set value
		this.students.at(this.studentActual).set('points', point);
		

		$pontuation.attr('data-stars-selected', point);
	},
	mouseOutPontuation: function(e){
		var $el = $(e.target);
		var $pontuation = $el.closest('.c-student-pontuation');
		var actualPoints = $pontuation.attr('data-stars-selected');

		//if contains point, back to this, else reset
		console.log("mouseout", actualPoints);
		if(actualPoints){
			this.starsPontuationIterator({
				pontuation: $pontuation, 
				point: actualPoints,
				newClass: "glyphicon glyphicon-star active",
				override: true
			});
		}else{
			this.starsPontuationIterator({
				pontuation: $pontuation, 
				newClass: "glyphicon glyphicon-star-empty",
				override: true
			});
		}
	},
	hoverGlyphicon: function(e){
		var $el = $(e.target);
		var $pontuation = $el.closest('.c-student-pontuation');
		var actualPoints = $pontuation.attr('data-stars-selected');

		this.starsPontuationIterator({
			pontuation: $pontuation, 
			point: $el.attr('data-point'),
			newClass: "glyphicon glyphicon-star",
			override: false
		});

		if(actualPoints){
			this.starsPontuationIterator({
				pontuation: $pontuation, 
				point: actualPoints,
				newClass: "glyphicon glyphicon-star active",
				override: false
			});
		}
	},
	starsPontuationIterator: function(obj){
		if(!obj.point){
			obj.point = 1;
		}

		var pointElem = parseInt(obj.point);
		var $stars = obj.pontuation.find('.glyphicon');

		$stars.each(function(){
			var $this = $(this);
			var point = parseInt($this.attr('data-point'));
			if(point <= pointElem){				
				$(this).attr("class", obj.newClass);
			}else{
				if(obj.override){
					$(this).attr("class", "glyphicon glyphicon-star-empty");
				}
			}
			point--;
		});
	},
	renderInitialPage: function(){
		this._render("c-initial-page", {}, {top: "home"});
		//this._render("c-page-teacher", this.students.at(this.studentActual).toJSON());
	},
	goToAvaliation: function(){
		this._render("c-page-teacher", this.students.at(this.studentActual).toJSON());
	},
	_render: function(idTemplate, data, dataTop){
		if(!data){
			data = {};
		}
		var dataTopObj = {
			menutop : ''
		};

		if(dataTop && dataTop['top']){
			dataTopObj.menutop = dataTop.top;
		}
		console.log(dataTop, dataTopObj)
		$('#content-top').html(_.template($("#c-top-menu").html(), dataTopObj));
		$('#content').html(_.template($("#"+idTemplate).html(), data));
	}
});

var Router = Backbone.Router.extend({
    // routes configuration
    routes: {
    	'home' : 'home',
        'teacher' : 'teacher',
        'teacher/init' : 'initTeacher',
        'teacher/end' : 'endTeacher',
        'friend(/:id)' : 'friend',
        'solemnities' : 'solemnities',
        'congrats' : 'congrats'
    },
    initialize: function(){
    	//empty redirect to home
    	this.$title = $('title');
    	this.defaultTitle = "Formandos 2013.1";
    	this.route(/^$/, "home", this.home);
    },
    teacher: function() {
    	this.$title.html(this.defaultTitle + " - Professores");
    	appView.goToAvaliation();
    },
    home: function(){
    	this.$title.html(this.defaultTitle);
    	appView.renderInitialPage();
    },
    initTeacher: function(){
    	this.$title.html(this.defaultTitle + " - Professores");
    	appView.studentActual = 0;
    	appView._render("c-page-init-teacher");
    },
    endTeacher: function(){
    	this.$title.html(this.defaultTitle + " - Contribua =)");
    	appView._render("c-page-end-teacher", {
    		points: appView.students.getPoints(),
    		total: appView.students.getMaxPoints(),
    		qualify: appView.students.qualifyPoints()
    	});
    },
    friend: function(id){
    	var ok = false;
    	if(id){
    		var student = appView.students.findWhere({shortname: id});
    		if(student){
    			this.$title.html(this.defaultTitle + " - " + student.get('name'));
    			appView._render("c-student-page", student.toJSON());
    			ok = true;
    		}
    	}
    	if(!ok){
    		this.$title.html(this.defaultTitle + " - Amigos");
    		appView._render("c-friends-page", {students: appView.students.toJSON()});
    	}
    },
    solemnities: function(){
    	this.$title.html(this.defaultTitle + " - Solenidades");
    	appView._render("c-page-solemnities", {}, {top: "solemnities"});
    	initializeGMAPS();
    },
    congrats: function(){
    	this.$title.html(this.defaultTitle);
    	appView._render("c-page-congrats");
    }
});

function initializeGMAPS() {
	var posit = new google.maps.LatLng(-5.056148,-42.789863);
		var mapOptions = {
		zoom: 17,
		center: posit,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};
	var map1 = new google.maps.Map(document.getElementById('map-1'),mapOptions);
	var mark1 = new google.maps.Marker({
	    position: posit,
	    map: map1,
	    title: 'Departamento de Computação'
	});
	//
	posit = new google.maps.LatLng(-5.062464, -42.797468);
	mapOptions.center = posit;
	var map2 = new google.maps.Map(document.getElementById('map-2'),mapOptions);
	var mark2 = new google.maps.Marker({
	    position: posit,
	    map: map2,
	    title: 'Noé Mendes'
	});
	//
	posit = new google.maps.LatLng(-5.083993, -42.798680);
	mapOptions.center = posit;
	var map3 = new google.maps.Map(document.getElementById('map-3'),mapOptions);
	var mark3 = new google.maps.Marker({
	    position: posit,
	    map: map3,
	    title: 'Centro Paroquial Paulo VI'
	});
}
google.maps.event.addDomListener(window, 'load', initializeGMAPS);

// Run components.
var appView = new AppView();
var router = new Router();
Backbone.history.start();