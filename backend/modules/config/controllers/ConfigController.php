<?php

namespace app\modules\config\controllers;

//cargamos el modelo de configuración
use common\models\Configuracion;
//cargamos el modelo de configuración
use common\models\Config;

use Yii;

use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\helpers\BaseJson;

class ConfigController extends Controller
{
    public function behaviors()
    {
        return [
        		'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['index', 'guardaop'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'guardaop' => ['post'],
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
		return '1';
	}
}
