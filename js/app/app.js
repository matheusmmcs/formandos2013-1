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
		'click .c-back-route' : 'backRoute'
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
				"default": "Entusiasta em usabilidade e interações de usuários. Quando criança, sonhava ser jogador de futebol, mas esse sonho acabou logo, quando percebeu que a única habilidade dos seus pés era caminhar.<br/><br/>Saudações Rubro-negras!"
			},
			photo: "Matheus.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 1,
			name: "Jurandir Cavalcante",
			shortname: "Jurandir",
			descriptions: {
				"default": "Descrição"
			},
			photo: "Jurandir.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 2,
			name: "Pedro Almir",
			shortname: "Pedro",
			descriptions: {
				"default": "..."
			},
			photo: "Pedro.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 3,
			name: "Anderson Soares",
			shortname: "Anderson",
			descriptions: {
				"default": "..."
			},
			photo: "Anderson.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 4,
			name: "Janderson",
			shortname: "Janderson",
			descriptions: {
				"default": "..."
			},
			photo: "Janderson.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 5,
			name: "Rodolfo",
			shortname: "Rodolfo",
			descriptions: {
				"default": "..."
			},
			photo: "Rodolfo.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 6,
			name: "Vinicius",
			shortname: "Vinicius",
			descriptions: {
				"default": "..."
			},
			photo: "Vinicius.jpg"
		});
		this.students.push(student);
		student = new StudentModel({
			id: 7,
			name: "Grazianny",
			shortname: "Grazianny",
			descriptions: {
				"default": "..."
			},
			photo: "Grazianny.jpg"
		});
		this.students.push(student);
		this.students.sort();
		this.studentActual = 0;
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
    	this.route(/^$/, "home", this.home);
    },
    teacher: function() {
    	appView.goToAvaliation();
    },
    home: function(){
    	appView.renderInitialPage();
    },
    initTeacher: function(){
    	appView.studentActual = 0;
    	appView._render("c-page-init-teacher");
    },
    endTeacher: function(){
    	appView._render("c-page-end-teacher", {
    		points: appView.students.getPoints(),
    		total: appView.students.getMaxPoints(),
    		qualify: appView.students.qualifyPoints()
    	});
    },
    friend: function(id){
    	var ok = false;
    	if(id){
    		var student = appView.students.findWhere({id: parseInt(id)});
    		if(student){
    			appView._render("c-student-page", student.toJSON());
    			ok = true;
    		}
    	}
    	if(!ok){
    		appView._render("c-friends-page", {students: appView.students.toJSON()});
    	}
    },
    solemnities: function(){
    	appView._render("c-page-solemnities", {}, {top: "solemnities"});
    },
    congrats: function(){
    	appView._render("c-page-congrats");
    }
});


// Run components.
var appView = new AppView();
var router = new Router();
Backbone.history.start();
