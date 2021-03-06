<?php
// Widget qu e tiene la función de crear la lista de controles de configuración

namespace app\modules\config\widgets;

use yii\base\Widget;
//use yii\helpers\Html;
use yii\db\Query;

class ControlesConf extends Widget
{
	public $idconf=""; //id de la caja donde irían los componentes de configuración
	    
    public function init()
    {
        parent::init();
            
    }
	
	private function NuevoControl($conf)
	{
		$htmlCont='<input class="conf-C form-control" type="'.$conf['control'].'" id="'.$conf['cod'].'" min="1" max="999" value="'.$conf['valor'].'">';
		
		$salida='<div class="col-md-4 col-xs-12 conf-block">
					<div class="conf-descrip col-xs-12">'.$conf['descripcion'].'</div>
					<div class="conf-control col-xs-12">'.$htmlCont.' '.$conf['unidad'].'</div>'
				.'</div>';
		return $salida;
	}

	private function OpcionGuardar()
	{
		return "<div class='col-xs-12 conf-g'>
					<input id='GuardaOpcio' class='btn btn-success btn-xs' value='Guardar configuración' type='button'>
				</div>";	
	}	
	
    public function run()
    {
    	$Html='';
    	//recorremos los registros de la tabla de configuraciones y creamos los controles
    	$Consulta=(new \yii\db\Query())->select('*')->from('configuracion')->all();
    	foreach ($Consulta as $conf){
    		$Html.=$this->NuevoControl($conf);
    	}
    	unset($conf);
    	
		//$Html .= $this->OpcionGuardar();    	
    	
        return $Html;
    }
}

?>