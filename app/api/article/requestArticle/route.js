import { NextResponse } from "next/server";
import { query } from "../../../lib/db";
export async function POST(req){
    const {id} = await req.json()
    try{
        const res = await query('SELECT * FROM artikel WHERE id = @param0',[id])
        console.log('data query: '+id,res)
        return NextResponse.json({
            article : res
        })
    }catch(e){
        return NextResponse.json({
            success:false,
            message:'gagal di fetch'
        })
    }
}