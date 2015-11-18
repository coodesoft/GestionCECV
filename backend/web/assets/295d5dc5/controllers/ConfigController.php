<?php

namespace app\modules\config\controllers;

//cargamos el modelo de configuración
use common\models\Configuracion;

use Yii;

use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

use yii\helpers\BaseJson;

class ConfigController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['post'],
                ],
            ],
        ];
    }

    public function actionIndex(){
		return $this->render('index.php');    
    }
    
	// "Action" quepermite guardar las opciones de configuración     
	public function actionGuardaop(){
		$Datos=BaseJson::decode($_REQUEST["OPC"]);
		$Valores=BaseJson::decode($_REQUEST["OPV"]);
		//recorremos las opciones de configuración y guardamos
		for($c=0;$c<sizeof($Datos);$c++){
			$modelo=configuracion::findOne($Datos[$c]);
			$modelo->valor=$Valores[$c];
			$modelo->save(false); //hay que arreglar el temita de la validación
		}
		return '0';	
	}    
}
