import { NextResponse } from 'next/server'
import {query} from '../../lib/db'
export async function POST(req){
    const {userID, score} = await req.json()
    try{
        console.log('data update list: ',userID,score)
        await query('UPDATE msuser SET UserScore = UserScore + ? WHERE UserID = ?',[score,userID])
        return NextResponse.json({
            success: true,
            message: 'score berhasil diupdate'
        })
    }catch(e){
        return NextResponse.json({
            success:false,
            message: 'score gagal ditambahkan'
        })
    }
}