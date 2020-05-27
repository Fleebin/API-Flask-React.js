from flask import Flask, request
from flask_restful import Api, Resource
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

POSTGRES = {
    'user': 'postgres',
    'pw': '24636112',
    'db': 'flask-api',
    'host': 'localhost',
    'port': '8080',
}


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
db = SQLAlchemy(app)
ma = Marshmallow(app)

#Modelando classe
class Polo(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String())

    def __repr__(self):
        return f"<Polo {self.nome}>"

#Passando os campos do banco
class PoloSchema(ma.Schema):
    class Meta:
        fields = ("id", "nome")

polos_schema = PoloSchema(many=True)      


#GET geral
class PolosResource(Resource):
    def get(self):
        all_polos = Polo.query.all()
        

        return polos_schema.dump(all_polos)


#GET pelo ID
class PoloResource(Resource):

  def get(self, pk):
        polo_schema = PoloSchema()
        polo_id = Polo.query.get_or_404(pk)

        return polo_schema.dump(polo_id)



#Modelando classe
class Terminal(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    serial = db.Column(db.Integer())
    polo_id = db.Column(db.Integer, db.ForeignKey('polo.id'))
    polo = db.relationship('Polo', backref='maquinas')


    def __repr__(self):
        return f"<Terminal {self.serial}>"

#Passando os campos do banco
class TerminalSchema(ma.Schema):
    class Meta:
        fields = ('serial', 'id','polo_id')
        include_fk = True

terminal_schema = TerminalSchema()
terminais_schema = TerminalSchema(many=True)

#GET e POST geral
class TerminaisResource(Resource):
    def get(self):
        all_terminais = Terminal.query.all()
        return terminais_schema.dump(all_terminais)

    def post(self):
        data = request.json
        terminal = Terminal(serial=data['serial'], polo_id=data['polo_id'])
        db.session.add(terminal)
        db.session.commit()
        return terminal_schema.dump(terminal)

#GET, POST, PATCH e DELETE Pelo ID
class TerminalResource(Resource):

  def get(self, pk):

        return terminais_schema.dump(Terminal.query.get_or_404(pk))

  def patch(self, pk):
        data = request.json
        terminal = Terminal.query.get_or_404(pk)

        if 'serial' in data:
            terminal.serial = data['serial']

        if 'id' in data:
            terminal.id = data['id']
        
        db.session.commit()
        return terminais_schema.dump(Terminal)
        
            
  def delete(self, pk):
        terminal = Terminal.query.get_or_404(pk)
        db.session.delete(terminal)
        db.session.commit()
        return '', 204

class ListagemResource(Resource):
    def get(self, pk):
        polo = Polo.query.filter_by(id=pk).first()
        return terminais_schema.dump(Terminal.query.filter_by(polo=polo).all())

api.add_resource(ListagemResource, '/listagem/<int:pk>')
api.add_resource(TerminalResource, '/terminal/<int:pk>')
api.add_resource(TerminaisResource, '/terminais')

api.add_resource(PoloResource, '/polos/<int:pk>')
api.add_resource(PolosResource, '/polos')


if __name__ == '__main__':
    app.run(debug=True, port=5000)
