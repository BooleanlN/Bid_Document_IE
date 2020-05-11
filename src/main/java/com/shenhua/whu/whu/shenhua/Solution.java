package com.shenhua.whu.whu.shenhua;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;
//9 3
//100 200 300 400 500 600 700 800 900
class Solution {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNextInt()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
            int a = in.nextInt();
            for (int i = 0; i < a ; i++) {
                int sum = in.nextInt();
                for (int j = 0; j < sum; j++) {
                    String inp = in.nextLine();
                    String[] ops = inp.split(" ");
                    if(ops[0].equals("PUSH")){

                    }
                }
            }

        }
    }
    public static int maxProfit(int[] prices) {
        if(prices.length == 0 || prices.length == 1 && prices[0] > 0)return 0;
        int[][] dp = new int[prices.length][2];
        dp[0][1] =-prices[0];
        for (int i = 1; i < prices.length ; i++) {
            if(i>=2)dp[i][1] = Math.max(dp[i-1][1],dp[i-2][0]-prices[i]); // 买入
            else dp[i][1] = Math.max(dp[i-1][1],-prices[i]); // 买入
            dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1] + prices[i]); // 抛售
        }
        return dp[prices.length - 1][0];
    }
    public static int maxProfit_yh(int[] prices) {
        if(prices.length == 0 || prices.length == 1 && prices[0] > 0)return 0;
        int dp1 =-prices[0];
        int[] dp0 = new int[prices.length];
        for (int i = 1; i < prices.length ; i++) {
            dp0[i] = Math.max(dp0[i-1],dp1 + prices[i]); // 未持有
            if(i>=2){
                dp1 = Math.max(dp1,dp0[i-2]-prices[i]); // 持有
            }
            else dp1 = Math.max(dp1,-prices[i]); // 持有
        }
        return dp0[prices.length-1];
    }
    public static List<List<Integer>> permute(int[] nums) {
        LinkedList<Integer> track = new LinkedList<>();
        List<List<Integer>> result = new LinkedList<>();
        backtrack(nums,track,result);
        return result;
    }
    static void backtrack(int[] nums, LinkedList<Integer> track, List<List<Integer>> res){
        if(track.size() == nums.length){
            res.add(new LinkedList(track));
            return;
        }
        for (int i = 0; i < nums.length ; i++) {
            if(track.contains(nums[i]))continue;
            track.add(nums[i]);
            backtrack(nums,track,res);
            track.removeLast();
        }

    }
}
