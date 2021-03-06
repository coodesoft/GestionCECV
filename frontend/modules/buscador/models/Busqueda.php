<?php
	namespace app\modules\buscador\models;

	use yii\base\Model;
	
	class Busqueda extends Model
	{
		//Parametros que se deben recibir a través de una petición al controlador
		public $TBusqueda;
		public $Desplaza;
		public $OrdenResu;
		public $CantReg;
		public $Tabla;
		//Parámetros necesarios para la búsqueda $TBusqueda y: 		
		public $CamposB;
		//Parámetros que se usaran para la salida
		public $CantTot; // se almacenará la cantidad total de registros		
		
		public $ResBusca;	
		
		public function Resultados(){
			$Consulta = (new \yii\db\Query())
						->select('*')
						->from($this->Tabla)
						->where(['like',$this->CamposB,'%'.$this->TBusqueda.'%',false]);
						
			if ($this->OrdenResu != "n"){ //se ordena
		 		if ($this->OrdenResu == "d"){ 
		 			$Consulta = $Consulta->orderBy(['Nombre'=>SORT_DESC]);
		 		} else {
		 			if ($this->OrdenResu == "a"){ 
		 				$Consulta = $Consulta->orderBy(['Nombre'=>SORT_ASC]);
		 			}
		 		}		 
		 	}
		 	
		 	$this->CantTot=$Consulta->count();
		 	$Consulta = $Consulta->offset($this->Desplaza)->limit($this->CantReg)->all();
		 	
		 	$this->ResBusca = $Consulta;
			return $this->toArray(['CantTot','ResBusca']);
		}
	}
