/**
 * Testimonial Service - Database operations
 * Demonstrates clean architecture and separation of concerns
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient, 
  GetCommand, 
  PutCommand, 
  DeleteCommand, 
  ScanCommand, 
  UpdateCommand 
} from "@aws-sdk/lib-dynamodb";
import type { 
  Testimonial, 
  APIResponse, 
  PaginatedResponse 
} from '@/lib/types/testimonial';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TESTIMONIALS_TABLE || "testimonials";

export const testimonialsService = {
  /**
   * Get all testimonials from database
   */
  async getAll(): Promise<PaginatedResponse<Testimonial>> {
    try {
      const command = new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "attribute_exists(id)",
      });

      const response = await docClient.send(command);
      
      return {
        success: true,
        data: (response.Items || []) as Testimonial[],
        total: response.Count || 0,
      };
    } catch (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Failed to fetch testimonials',
        total: 0,
      };
    }
  },

  /**
   * Get testimonial by ID
   */
  async getById(id: string): Promise<APIResponse<Testimonial>> {
    try {
      const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      });

      const response = await docClient.send(command);
      
      if (!response.Item) {
        return {
          success: false,
          error: 'Testimonial not found',
        };
      }

      return {
        success: true,
        data: response.Item as Testimonial,
      };
    } catch (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Failed to fetch testimonial',
      };
    }
  },

  /**
   * Create new testimonial
   */
  async create(testimonial: Testimonial): Promise<APIResponse<Testimonial>> {
    try {
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: testimonial,
        ConditionExpression: "attribute_not_exists(id)",
      });

      await docClient.send(command);
      
      return {
        success: true,
        data: testimonial,
      };
    } catch (error: any) {
      console.error('Database error:', error);
      
      if (error.name === 'ConditionalCheckFailedException') {
        return {
          success: false,
          error: 'Testimonial with this ID already exists',
        };
      }
      
      return {
        success: false,
        error: 'Failed to create testimonial',
      };
    }
  },

  /**
   * Update existing testimonial
   */
  async update(
    id: string, 
    updates: Partial<Testimonial>
  ): Promise<APIResponse<Testimonial>> {
    try {
      // Build update expression dynamically
      const updateParts: string[] = [];
      const expressionAttributeNames: Record<string, string> = {};
      const expressionAttributeValues: Record<string, any> = {};

      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && value !== undefined) {
          updateParts.push(`#${key} = :${key}`);
          expressionAttributeNames[`#${key}`] = key;
          expressionAttributeValues[`:${key}`] = value;
        }
      });

      if (updateParts.length === 0) {
        return {
          success: false,
          error: 'No valid updates provided',
        };
      }

      const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `SET ${updateParts.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
        ConditionExpression: "attribute_exists(id)",
      });

      const response = await docClient.send(command);
      
      return {
        success: true,
        data: response.Attributes as Testimonial,
      };
    } catch (error: any) {
      console.error('Database error:', error);
      
      if (error.name === 'ConditionalCheckFailedException') {
        return {
          success: false,
          error: 'Testimonial not found',
        };
      }
      
      return {
        success: false,
        error: 'Failed to update testimonial',
      };
    }
  },

  /**
   * Delete testimonial
   */
  async delete(id: string): Promise<APIResponse<void>> {
    try {
      const command = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
        ConditionExpression: "attribute_exists(id)",
      });

      await docClient.send(command);
      
      return {
        success: true,
      };
    } catch (error: any) {
      console.error('Database error:', error);
      
      if (error.name === 'ConditionalCheckFailedException') {
        return {
          success: false,
          error: 'Testimonial not found',
        };
      }
      
      return {
        success: false,
        error: 'Failed to delete testimonial',
      };
    }
  },
};