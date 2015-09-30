<?php

namespace app\modules\buscador\controllers;

use Yii;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

use common\models\stock;
use common\models\stockar;
use app\modules\buscador\models\resultados;

use yii\helpers\BaseJson;

class BuscadorController extends Controller
{
    public function actionResult()
    {
		 $TBusqueda=urldecode($_REQUEST["TB"]);		 
		 $Model = new stock();
		 $Model = $Model::find()
		 	->where(['like','Nombre','%'.$TBusqueda.'%',false])
			-> all();
    	 return BaseJson::encode($Model);
    }

}