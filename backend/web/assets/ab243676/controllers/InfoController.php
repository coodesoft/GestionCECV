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
     * Lists all datosuser models.
     * @return mixed
     */
    public function actionIndex()
    {
        $Config=new Config(['conf'=>'DirWeb']);
		$Rweb=$Config->Valor();
        return $this->render('index', [
            'Rweb'=>$Rweb,
        ]);
    }

    /**
     * Displays a single datosuser model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new datosuser model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new datosuser();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->IdUser]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing datosuser model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->IdUser]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
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

    /**
     * Finds the datosuser model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return datosuser the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = datosuser::findOne($id)) !== null) {
            return $model;
        } else {
            return '';
        }
    }
}