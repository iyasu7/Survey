<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id',$user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->all();
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image']=$relativePath;
        }
        $survey = Survey::create($data);
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($user->id !== $survey->user_id){
            return abort(403,'Unauthorized action!');
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
       $survey->update($request->validate());
       return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($user->id !== $survey->user_id){
            return abort(403,'Unauthorized action!');
        }
        $survey->delete();
        return response("",204);
    }
    public function saveImage($image)
    {
        if(preg_match('/^data:image\/(\w+);base64,/',$image, $type)){

            $image = substr($image,strpos($image,',')+1);

            $type = strtolower($type[1]);

            if(!in_array($type,['jpg','jpeg','gif','png'])){
                throw new \Exception('invalid image type');
            }
            $image = str_replace('', '+',$image );
            $image = base64_decode($image);
            
            if($image === false ) {
                throw new \Exception('base64_decode failed');
            }}
            else {
                throw new \Exception('did not match data URL with image data');
            }
            $dir = 'images/';
            $file = Str::random(). '.'.$type;
            $absolutePath =public_path($dir);
            $relativePath = $dir . $file;

            if(!File::exists($absolutePath)){
                File::makeDirectory($absolutePath, 8755, true);
            }
            file_put_contents($relativePath,$image);

            return $relativePath;
    }
}
