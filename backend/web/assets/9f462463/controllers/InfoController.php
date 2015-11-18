<?php

namespace app\modules\gestiondatos\controllers;

use Yii;
use app\models\datosuser;
use app\models\datosuserb;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

use yii\helpers\BaseJson;

//cargamos el modelo de configuración
use common\models\Config;
/**
 * InfoController implements the CRUD actions for datosuser model.
 */
class InfoController extends Controller
{
    public function behaviors()
    {
        return [
           /* 'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['post'],
                ],
            ],*/
        ];
    }

    /**
 
     */
    public function actionIndex()
    {
        $Config=new Config(['conf'=>'DirWeb']);
		$Rweb=$Config->Valor();
		$model=new datosuser();
        return $this->render('index', [
            'Rweb'=>$Rweb,
            'model'=>$model,
        ]);
    }

	//Ingresar la suspensión de un usuario
	public function actionSuspend()
	{
		//carga de parametros
		$Estud=urldecode($_REQUEST["id"]); 
		//buscamos el estudiante y definimos suspensión en "1", más adelante se podria establecer la suspensión de más de un usuario
		$model=datosuser::findOne($Estud);
		$model->Suspendido=1;
		$model->save(false);
		//terminamos
		return '1';
	}
	
	//devolver información de un estudiante
	public function actionInfoest(){
		//carga de parametros
		$Estud=urldecode($_REQUEST["id"]); 
		$model=datosuser::findOne($Estud);
		//terminamos
		return BaseJson::encode($model);
	}

	//"action" modificar datos estudiante
	public function actionEditar(){
		$model = datosuser::findOne($_REQUEST["id"]);
        $model->NombreyApellido=urldecode($_REQUEST["NombreyApellido"]);
        $model->DNI=urldecode($_REQUEST["DNI"]);
		$model->Email=urldecode($_REQUEST["Email"]);
		$model->Telefono=urldecode($_REQUEST["Telefono"]);
        $model->save(false);
        return '1';
	}

    /**
    crear un estudiante nuevo
     */
    public function actionNuevo()
    {
        $model = new datosuser();

        $model->NombreyApellido=urldecode($_REQUEST["NombreyApellido"]);
        $model->DNI=urldecode($_REQUEST["DNI"]);
		$model->Email=urldecode($_REQUEST["Email"]);
		$model->Telefono=urldecode($_REQUEST["Telefono"]);
        $model->save();
        return '1';
    }

    
    /**
     "Action" para borrar un estudiante
     */
    public function actionDelete()
    {
    	$id=urldecode($_REQUEST['id']);
		$m=$this->findModel($id);   
		if($m!=''){
        	$m->delete();return '1';}else{return '0';}
        
    }
}