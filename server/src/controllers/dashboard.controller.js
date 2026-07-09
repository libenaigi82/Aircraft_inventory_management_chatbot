import { getDashboardData } from "../services/dashboard.service.js";

export async function dashboard(req,res){

    try{

        const data = await getDashboardData();

        res.json(data);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:"Failed to fetch dashboard."

        });

    }

}